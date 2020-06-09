import React, {PureComponent, Fragment} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ProfileForm from './ProfileForm';
import LandingComponent from '../Landing';
import Title from '../Title';
import Loading from '@Shared/Loading';

import * as user from '@Actions/user';
import * as snackbarActions from '@Actions/snackbar';
import * as businessActions from '@Actions/business';
import * as profileActions from '@Actions/admin-profile';
import {falsyToString, getAuthorization} from '@Utils';
import {getPhonesToApi} from './ProfileForm/phonesToApi';
import {
  FILE_SIZE,
  SUPPORTED_FORMATS,
} from '@Shared/FormElements/CustomImageInput';

export const ProfileSchema = Yup.object().shape({
  contactEmail: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  organizationName: Yup.string(),
  name: Yup.string().required('Required'),
  website: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  accreditations: Yup.string(),
  dateIncorporation: Yup.string(),
  legalStatus: Yup.string(),
  fundingSources: Yup.string(),
  licenses: Yup.string(),
  taxIdentifier: Yup.string(),
  taxStatus: Yup.string(),
  twitter: Yup.string()
    .url('URL invalid')
    .notRequired(),
  facebook: Yup.string()
    .url('URL invalid')
    .notRequired(),
  linkedin: Yup.string()
    .url('URL invalid')
    .notRequired(),
  phones: Yup.array().of(
    Yup.object().shape({
      phoneNumber: Yup.string(),
      ext: Yup.string(),
      vanityNumber: Yup.string(),
      numberType: Yup.string(),
      department: Yup.string(),
      countryExt: Yup.string(),
    })
  ),
  image: Yup.mixed()
    .notRequired()
    .test('fileSize', 'Maximum file size exceeds (3 MB)', value => {
      if (!value) {
        return true;
      }

      return value && value.size <= FILE_SIZE;
    })
    .test(
      'fileFormat',
      `Invalid file type \nSupported: ${SUPPORTED_FORMATS.join(', ')}`,
      value => {
        if (!value) {
          return true;
        }

        return value && SUPPORTED_FORMATS.includes(value.type);
      }
    ),
});

class ProfileFormContainer extends PureComponent {
  componentDidMount() {
    const {business, organizationId} = this.props;

    business.fetchOrganizationById(organizationId);
  }

  componentDidUpdate(prevProps) {
    const {
      errors,
      snackbar,
      success,
      organization,
      updatedOrganization,
    } = this.props;

    if (errors.length !== prevProps.errors.length) {
      let title;
      if (errors[0]) {
        title = errors[0].title;
      } else {
        title = 'There was a problem';
      }

      snackbar.showSnackbar({
        message: title,
      });
    }

    if (success !== prevProps.success) {
      if (success) {
        snackbar.showSnackbar({
          message: 'Profile updated successfully',
        });
        this._initialValues = updatedOrganization;
      }
    }

    if (
      Object.keys(organization).length !==
      Object.keys(prevProps.organization).length
    ) {
      this._initialValues = organization;
    }
  }

  _joinBy(arrArg, separtor) {
    if (arrArg && arrArg.length > 0) {
      return arrArg.join(separtor);
    }
    return '';
  }

  _putPhones(phones) {
    return phones.map(phone => {
      const mappedPhone = {
        department: phone.department,
        extension: phone.ext,
        number_type: phone.numberType,
        number: phone.phoneNumber,
        vanity_number: phone.vanityNumber,
        country_prefix: phone.countryExt,
        _destroy: false,
      };

      if (phone.id) {
        mappedPhone.id = phone.id;
      }

      return mappedPhone;
    });
  }
  _mapInitialValues(organization) {
    const clean = Object.keys(organization).reduce((acc, key) => {
      acc[key] = falsyToString(organization[key]);
      return acc;
    }, {});

    const map = {
      id: clean.id,
      contactEmail: clean.email,
      organizationName: clean.alternate_name,
      name: clean.name,
      website: clean.website,
      description: clean.description,
      accreditations: this._joinBy(clean.accreditations, ','),
      dateIncorporation: clean.date_incorporated,
      legalStatus: clean.legal_status,
      fundingSources: this._joinBy(clean.funding_sources, ','),
      licenses: this._joinBy(clean.licenses, ','),
      taxIdentifier: clean.tax_id,
      taxStatus: clean.tax_status,
      twitter: clean.twitter,
      facebook: clean.facebook,
      linkedin: clean.linkedin,
      phones: getPhonesToApi(clean.phones),
      deletedPhones: [],
    };

    if (clean.logo_url) {
      map.logo = clean.logo_url;
    }

    return map;
  }
  _mapFormToServer(values) {
    return {
      name: values.name,
      accreditations: `{${values.accreditations}}`,
      alternate_name: values.organizationName,
      description: values.description,
      email: values.contactEmail,
      facebook: values.facebook,
      funding_sources: `{${values.fundingSources}}`,
      licenses: `{${values.licenses}}`,
      linkedin: values.linkedin,
      phones_attributes: [
        ...this._putPhones(values.phones),
        ...values.deletedPhones,
      ],
      twitter: values.twitter,
      website: values.website,
      tax_status: values.taxStatus,
      tax_id: values.taxIdentifier,
      legal_status: values.legalStatus,
      date_incorporated: values.dateIncorporation,
      image: values.image,
    };
  }

  _initialValues;

  render() {
    const {
      auth,
      breakpoint,
      organization,
      organizationId,
      profile,
      updatedOrganization,
    } = this.props;
    let form = <Loading />;
    let displayName = organization.name;
    let initialValues = organization;

    if (Object.keys(updatedOrganization).length > 0) {
      initialValues = updatedOrganization;
    }

    if (Object.keys(organization).length > 0) {
      form = (
        <Formik
          enableReinitialize={true}
          render={_props => (
            <Fragment>
              <Title
                titleText="Profile"
                hideCancelAction={false}
                submitLabel={'Save Changes'}
                submitClicked={_props.submitForm}
                cancelClicked={() =>
                  _props.resetForm(this._mapInitialValues(this._initialValues))
                }
              />
              <ProfileForm {..._props} breakpoint={breakpoint} />
            </Fragment>
          )}
          initialValues={this._mapInitialValues(initialValues)}
          validationSchema={ProfileSchema}
          onSubmit={values => {
            const organizationToServer = this._mapFormToServer(values);
            profile.updateCompany({
              organization: organizationToServer,
              organizationId,
              auth,
            });
          }}
        />
      );
    }

    if (updatedOrganization.name) {
      displayName = updatedOrganization.name;
    }

    return (
      <LandingComponent
        breakpoint={breakpoint}
        navigation={true}
        displayName={displayName}
      >
        {form}
      </LandingComponent>
    );
  }
}

const mapStateToProps = _state => {
  const organizationId =
    _state.user.organizationId || sessionStorage.getItem('organizationId');
  const auth = getAuthorization(_state);

  return {
    auth,
    emailSent: _state.user.emailReset !== '',
    errors: _state.adminProfile.updatedOrganization.errors,
    isAuth: _state.user.authorization !== '',
    organization: _state.businesses.organization,
    organizationId,
    success: _state.adminProfile.updatedOrganization.success,
    updatedOrganization: _state.adminProfile.updatedOrganization.data,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    userActions: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
    business: bindActionCreators(businessActions, _dispatch),
    profile: bindActionCreators(profileActions, _dispatch),
  };
};

ProfileFormContainer.propTypes = {
  auth: PropTypes.string,
  breakpoint: PropTypes.string,
  business: PropTypes.shape({
    fetchOrganizationById: PropTypes.func,
  }),
  errors: PropTypes.arrayOf(PropTypes.shape({})),
  isAuth: PropTypes.bool,
  organization: PropTypes.shape({}),
  organizationId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  profile: PropTypes.shape({
    updateCompany: PropTypes.func,
  }),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  success: PropTypes.bool,
  updatedOrganization: PropTypes.shape({}),
  userActions: PropTypes.shape({
    login: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileFormContainer);

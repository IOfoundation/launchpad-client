import React, {PureComponent, Fragment} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

import ProfileForm from './ProfileForm';
import LandingComponent from '../Landing';
import Title from '../Title';
import Loading from '@Shared/Loading';

import * as user from '@Actions/user';
import * as snackbarActions from '@Actions/snackbar';
import * as businessActions from '@Actions/business';
import * as profileActions from '@Actions/admin-profile';
import {falsyToString} from '@Utils';

const SignupSchema = Yup.object().shape({
  contactEmail: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  organizationName: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  website: Yup.string()
    .url('URL invalid')
    .required('Required'),
  description: Yup.string().required('Required'),
  accreditations: Yup.string(),
  dateIncorporation: Yup.string(),
  legalStatus: Yup.string(),
  fundingSources: Yup.string(),
  licenses: Yup.string(),
  taxIdentifier: Yup.string(),
  taxStatus: Yup.string(),
  twitter: Yup.string().url('URL invalid'),
  facebook: Yup.string().url('URL invalid'),
  linkedin: Yup.string().url('URL invalid'),
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
});

const emptyPhone = {
  phoneNumber: '',
  ext: '',
  vanityNumber: '',
  numberType: '',
  department: '',
  countryExt: '',
};

class ProfileFormContainer extends PureComponent {
  componentDidMount() {
    const {business, organizationId} = this.props;

    business.fetchOrganizationById(organizationId);
  }

  componentDidUpdate(prevProps) {
    const {errors, snackbar, success} = this.props;

    if (errors.length !== prevProps.errors.length) {
      const title = errors[0].title;
      if (title) {
        snackbar.showSnackbar({
          message: title,
        });
      }
    }

    if (success !== prevProps.success) {
      if (success) {
        snackbar.showSnackbar({
          message: 'Profile updated successfully',
        });
      }
    }
  }

  _joinBy(arrArg, separtor) {
    if (arrArg && arrArg.length > 0) {
      return arrArg.join(separtor);
    }
    return '';
  }
  _getPhones(phones) {
    if (phones.length > 0) {
      return phones.map(phone => ({
        id: phone.id,
        department: falsyToString(phone.department),
        ext: falsyToString(phone.extension),
        numberType: falsyToString(phone.number_type),
        phoneNumber: falsyToString(phone.number),
        vanityNumber: falsyToString(phone.vanity_number),
        countryExt: falsyToString(phone.country_prefix),
      }));
    }
    return [{...emptyPhone}];
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
    return {
      id: clean.id,
      contactEmail: clean.email,
      organizationName: clean.alternate_name,
      name: clean.name,
      website: clean.website,
      description: clean.description,
      accreditations: this._joinBy(clean.accreditations, ','),
      dateIncorporation: clean.date_incorporated,
      legalStatus: '',
      fundingSources: this._joinBy(clean.funding_sources, ','),
      licenses: this._joinBy(clean.licenses, ','),
      taxIdentifier: '',
      taxStatus: '',
      twitter: clean.twitter,
      facebook: clean.facebook,
      linkedin: clean.linkedin,
      phones: this._getPhones(clean.phones),
      deletedPhones: [],
    };
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
    };
  }
  render() {
    const {
      breakpoint,
      organization,
      profile,
      organizationId,
      auth,
    } = this.props;
    let form = <Loading />;

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
              />
              <ProfileForm {..._props} breakpoint={breakpoint} />
            </Fragment>
          )}
          initialValues={this._mapInitialValues(organization)}
          validationSchema={SignupSchema}
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

    return (
      <LandingComponent breakpoint={breakpoint} navigation={true}>
        {form}
      </LandingComponent>
    );
  }
}

const mapStateToProps = _state => {
  const organizationId =
    _state.user.organizationId || localStorage.getItem('organizationId');
  const auth = _state.user.authorization || localStorage.getItem('userAuth');
  return {
    auth,
    emailSent: _state.user.emailReset !== '',
    errors: _state.adminProfile.updatedOrganization.errors,
    isAuth: _state.user.authorization !== '',
    organization: _state.businesses.organization,
    organizationId,
    success: _state.adminProfile.updatedOrganization.success,
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
  userActions: PropTypes.shape({
    login: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileFormContainer));

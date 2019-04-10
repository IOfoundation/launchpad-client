import React, {PureComponent} from 'react';
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
import {falsyToString} from '@Utils';

const SignupSchema = Yup.object().shape({
  contactEmail: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  organizationName: Yup.string().required('Required'),
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
  twitter: Yup.string(),
  facebook: Yup.string(),
  linkedin: Yup.string(),
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

const initialValues = {
  password: '',
  contactEmail: '',
  organizationName: '',
  name: '',
  website: '',
  description: '',
  accreditations: '',
  dateIncorporation: '',
  legalStatus: '',
  fundingSources: '',
  licenses: '',
  taxIdentifier: '',
  taxStatus: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  phones: [{...emptyPhone}],
};

class ProfileFormContainer extends PureComponent {
  state = {
    initialValues,
  };
  componentDidMount() {
    const {business, organizationId} = this.props;

    business.fetchOrganizationById(organizationId);
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
        department: phone.department,
        ext: phone.extension,
        numberType: phone.number_type,
        phoneNumber: phone.number,
        vanityNumber: phone.vanity_number,
      }));
    }
    return [{...emptyPhone}];
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
      accreditations: this._joinBy(clean.accreditations, ', '),
      dateIncorporation: clean.date_incorporated,
      legalStatus: '',
      fundingSources: this._joinBy(clean.funding_sources, ', '),
      licenses: this._joinBy(clean.licenses, ', '),
      taxIdentifier: '',
      taxStatus: '',
      twitter: clean.twitter,
      facebook: clean.facebook,
      linkedin: clean.linkedin,
      phones: this._getPhones(clean.phones),
    };
  }
  render() {
    const {breakpoint, organization} = this.props;
    let form = <Loading />;

    if (Object.keys(organization).length > 0) {
      form = (
        <Formik
          enableReinitialize={true}
          render={_props => <ProfileForm {..._props} breakpoint={breakpoint} />}
          initialValues={this._mapInitialValues(organization)}
          validationSchema={SignupSchema}
          onSubmit={() => {}}
        />
      );
    }

    return (
      <LandingComponent breakpoint={breakpoint} navigation={true}>
        <Title
          titleText="Profile"
          hideCancelAction={false}
          submitLabel={'Save Changes'}
        />
        {form}
      </LandingComponent>
    );
  }
}

const mapStateToProps = _state => {
  const organizationId =
    _state.user.organizationId || localStorage.getItem('organizationId');
  return {
    error: _state.user.error,
    isAuth: _state.user.authorization !== '',
    organizationId,
    organization: _state.businesses.organization,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    userActions: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
    business: bindActionCreators(businessActions, _dispatch),
  };
};

ProfileFormContainer.propTypes = {
  breakpoint: PropTypes.string,
  business: PropTypes.shape({
    fetchOrganizationById: PropTypes.func,
  }),
  error: PropTypes.bool,
  isAuth: PropTypes.bool,
  organization: PropTypes.shape({}),
  organizationId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  userActions: PropTypes.shape({
    login: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileFormContainer));

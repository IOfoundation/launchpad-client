import React, {Fragment, PureComponent} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

import LandingComponent from '../Landing';
import Title from '../Title';
import ServiceForm from './ServiceForm';

import serviceModel from './Service/Model';
import * as user from '@Actions/user';
import * as snackbarActions from '@Actions/snackbar';
import * as serviceCreateActions from '@Actions/services/create';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  displayName: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .notRequired(),
  website: Yup.string(),
  status: Yup.string(),
  servicesAreas: Yup.string(),
  audience: Yup.string(),
  eligibility: Yup.string(),
  fees: Yup.string(),
  acceptedPaymentMethods: Yup.string(),
  fundingSources: Yup.string(),
  hoursRegular: Yup.array().of(
    Yup.object().shape({
      day: Yup.string(),
      opensAt: Yup.string(),
      closesAt: Yup.string(),
    })
  ),
  hoursHolidays: Yup.array().of(
    Yup.object().shape({
      day: Yup.string(),
      opensAt: Yup.string(),
      closesAt: Yup.string(),
    })
  ),
  applicationProcess: Yup.string(),
  requiredDocuments: Yup.string(),
  serviceLanguages: Yup.string(),
  interpretationServices: Yup.string(),
  waitTime: Yup.string(),
  keywords: Yup.string(),
  locationId: Yup.string(),
});

const initialValues = {
  name: '',
  displayName: '',
  description: '',
  email: '',
  website: '',
  status: '',
  servicesAreas: '',
  audience: '',
  eligibility: '',
  fees: '',
  acceptedPaymentMethods: '',
  fundingSources: '',
  hoursRegular: [],
  hoursHolidays: [],
  applicationProcess: '',
  requiredDocuments: '',
  serviceLanguages: '',
  interpretationServices: '',
  waitTime: '',
  keywords: '',
  serviceCategories: {
    financialManagement: false,
    capital: false,
    legalServices: false,
    marketingSales: false,
    networking: false,
    manufacturingLogistics: false,
    procurement: false,
    planningManagement: false,
    RDCommercialization: false,
    regulatoryCompliance: false,
    physicalSpace: false,
    mentoringCounseling: false,
    humanResourcesWorkforceDevelopment: false,
  },
  businessType: {
    startupOrHighGrowthBusiness: false,
    mainStreetOrSmallBusiness: false,
    microenterpriseorHomeBasedBusiness: false,
  },
  businessStage: {
    ideaInception: false,
    proofOfConceptPrototypeMarketInfo: false,
    rollout: false,
    growthExpansionMatureBusiness: false,
  },
  underservedCommunities: {
    africanAmerican: false,
    asian: false,
    hispanic: false,
    immigrant: false,
    LGBTQ: false,
    manufacturingLogistics: false,
    nativeAmerican: false,
    veteran: false,
    woman: false,
    exConvict: false,
    other: false,
  },
  industry: {
    agriculture: false,
    arts: false,
    biosciencesServicesandMfg: false,
    construction: false,
    education: false,
    energyUtilities: false,
    financeInsurance: false,
    healthChildcare: false,
    highTechServicesManufacturing: false,
    informationTechnology: false,
    management: false,
    notforProfit: false,
    personalServices: false,
    professionalServices: false,
    realEstate: false,
    restaurantHotel: false,
    retail: false,
    tourism: false,
    transportationWarehousing: false,
    wholesale: false,
    otherServices: false,
  },
  locationId: '',
};

class ServiceFormContainer extends PureComponent {
  componentDidUpdate(prevProps) {
    const {
      serviceCreateError,
      seriveCreateErrors,
      snackbar,
      success,
    } = this.props;

    if (serviceCreateError !== prevProps.serviceCreateError) {
      let message = 'An error has ocurred';

      if (seriveCreateErrors.length > 0 && seriveCreateErrors[0].title) {
        message = seriveCreateErrors[0].title;
      }

      if (serviceCreateError) {
        snackbar.showSnackbar({
          message,
        });
      }
    }

    if (success !== prevProps.success) {
      if (success) {
        snackbar.showSnackbar({
          message: 'Service created/updated succesfully',
        });
        this.goToLocation();
      }
    }
  }

  goToLocation = () => {
    const {router, locationId} = this.props;

    router.push(`/admin/location/${locationId}`);
  };

  render() {
    const {locationId, Authorization, serviceCreate, locationName} = this.props;

    return (
      <LandingComponent>
        <Formik
          render={_props => (
            <Fragment>
              <Title
                titleText="Create A Service"
                hideCancelAction={false}
                submitLabel={'Save Service'}
                cancelClicked={this.goToLocation}
                submitClicked={_props.submitForm}
                subTitle={`for ${locationName}`}
              />
              <ServiceForm {..._props} goToLocation={this.goToLocation} />
            </Fragment>
          )}
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={values => {
            serviceCreate.create({
              service: serviceModel(values),
              Authorization,
              locationId,
              mode: 'new',
            });
          }}
        />
      </LandingComponent>
    );
  }
}

const mapStateToProps = _state => {
  const organizationId =
    _state.user.organizationId || sessionStorage.getItem('organizationId');
  const locationName =
    _state.user.locationName || sessionStorage.getItem('locationName');
  const Authorization =
    _state.user.authorization || sessionStorage.getItem('userAuth');
  const locationId =
    _state.user.locationId || sessionStorage.getItem('locationId');

  return {
    Authorization,
    error: _state.user.error,
    isAuth: _state.user.authorization !== '',
    locationId,
    locationName,
    organizationId,
    seriveCreateErrors: _state.serviceCreate.errors,
    serviceCreateError: _state.serviceCreate.error,
    serviceUpdated: _state.serviceCreate.service,
    success: _state.serviceCreate.success,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    userActions: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
    serviceCreate: bindActionCreators(serviceCreateActions, _dispatch),
  };
};

ServiceFormContainer.propTypes = {
  Authorization: PropTypes.string,
  error: PropTypes.bool,
  isAuth: PropTypes.bool,
  locationId: PropTypes.string,
  locationName: PropTypes.string,
  organizationId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  seriveCreateErrors: PropTypes.arrayOf(PropTypes.shape({})),
  serviceCreate: PropTypes.shape({
    create: PropTypes.func,
  }),
  serviceCreateError: PropTypes.bool,
  serviceUpdated: PropTypes.shape({}),
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
)(withRouter(ServiceFormContainer));

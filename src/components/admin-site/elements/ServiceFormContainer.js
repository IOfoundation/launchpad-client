import React from 'react';
import ServiceForm from './ServiceForm';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';

import * as user from '../../../actions/user';
import * as snackbarActions from '../../../actions/snackbar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import LandingComponent from '../Landing';
import Title from '../Title';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  displayName: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  website: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
  servicesAreas: Yup.string().required('Required'),
  audience: Yup.string().required('Required'),
  eligibility: Yup.string().required('Required'),
  fees: Yup.string().required('Required'),
  acceptedPaymentMethods: Yup.string().required('Required'),
  fundingSources: Yup.string().required('Required'),
  hoursRegular: Yup.array().of(
    Yup.object().shape({
      day: Yup.string().required('Required'),
      opensAt: Yup.string().required('Required'),
      closesAt: Yup.string().required('Required'),
    })
  ),
  hoursHolidays: Yup.array().of(
    Yup.object().shape({
      day: Yup.string().required('Required'),
      opensAt: Yup.string().required('Required'),
      closesAt: Yup.string().required('Required'),
    })
  ),
  applicationProcess: Yup.string().required('Required'),
  requiredDocuments: Yup.string().required('Required'),
  serviceLanguages: Yup.string().required('Required'),
  interpretationServices: Yup.string().required('Required'),
  waitTime: Yup.string().required('Required'),
  keywords: Yup.string().required('Required'),
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
};

const ServiceFormContainer = () => {
  return (
    <LandingComponent>
      <Title titleText="Create A Service" />
      <Formik
        render={_props => <ServiceForm {..._props} />}
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={() => {}}
      />
    </LandingComponent>
  );
};

const mapStateToProps = _state => {
  return {
    error: _state.user.error,
    isAuth: _state.user.authorization !== '',
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    userActions: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

ServiceFormContainer.propTypes = {
  error: PropTypes.bool,
  isAuth: PropTypes.bool,
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
)(withRouter(ServiceFormContainer));

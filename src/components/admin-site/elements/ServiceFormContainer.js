import React, {Fragment, PureComponent} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';

import LandingComponent from '../Landing';
import Title from '../Title';
import ServiceForm from './ServiceForm';

import serviceModel from './Service/Model';

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

const formSectionMap = {
  Categories: 'serviceCategories',
  Industry: 'industry',
  'Business Stage': 'businessStage',
  'Business Type': 'businessType',
  'Underserved Communities': 'underservedCommunities',
};
const taxonomyMap = {
  Categories: {
    Capital: 'capital',
    'Financial Management': 'financialManagement',
    'Human Resources & Workforce Development':
      'humanResourcesWorkforceDevelopment',
    'Legal Services': 'legalServices',
    'Manufacturing/Logistics': 'manufacturingLogistics',
    'Marketing/Sales': 'marketingSales',
    'Mentoring/Counseling': 'mentoringCounseling',
    Networking: 'networking',
    'Physical Space': 'physicalSpace',
    'Planning/Management': 'planningManagement',
    Procurement: 'procurement',
    'R&D/Commercialization': 'RDCommercialization',
    'Regulatory Compliance': 'regulatoryCompliance',
  },
  'Business Stage': {
    'Growth/Expansion/Mature Business': 'growthExpansionMatureBusiness',
    'Idea/Inception': 'ideaInception',
    'Proof of Concept/Prototype/Market Intro':
      'proofOfConceptPrototypeMarketInfo',
    Rollout: 'rollout',
  },
  'Business Type': {
    ' Main Street or Small Business': 'startupOrHighGrowthBusiness',
    'Microenterprise or Home Based Business': 'mainStreetOrSmallBusiness',
    'Startup or High-Growth Business': 'microenterpriseorHomeBasedBusiness',
  },
  Industry: {
    Agriculture: 'agriculture',
    Arts: 'arts',
    'Biosciences Services and Manufacturing': 'biosciencesServicesandMfg',
    Construction: 'construction',
    Education: 'education',
    'Energy & Utilities': 'energyUtilities',
    'Finance & Insurance': 'financeInsurance',
    'Health & Childcare': 'healthChildcare',
    'High Tech Services & Manufacturing': 'highTechServicesManufacturing',
    'Information Technology': 'informationTechnology',
    Management: 'management',
    Manufacturing: 'manufacturing',
    'Not for Profit': 'notforProfit',
    'Other Services': 'otherServices',
    'Personal Services': 'personalServices',
    'Professional Services': 'professionalServices',
    'Real Estate': 'realEstate',
    'Restaurant & Hotel': 'restaurantHotel',
    Retail: 'retail',
    Tourism: 'tourism',
    'Transportation & Warehousing': 'transportationWarehousing',
    Wholesale: 'wholesale',
  },
  'Underserved Communities': {
    'African American': 'africanAmerican',
    Asian: 'asian',
    'Ex-Convict': 'exConvict',
    Hispanic: 'hispanic',
    Immigrant: 'immigrant',
    LGBTQ: 'LGBTQ',
    'Native American': 'nativeAmerican',
    Other: 'other',
    Veteran: 'veteran',
    Woman: 'woman',
  },
};

const taxonomyToForm = taxonomies => {
  return taxonomies.reduce((acc, taxonomy) => {
    const formSection = formSectionMap[taxonomy.name];

    acc[formSection] = taxonomy.children.reduce((a, prop) => {
      const name = taxonomyMap[taxonomy.name];
      const formValue = name[prop.name];

      a[formValue] = true;

      return a;
    }, {});

    return acc;
  }, {});
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
    const {
      locationId,
      Authorization,
      serviceCreate,
      locationName,
      taxonomy,
    } = this.props;

    const _initialState = {...initialValues, ...taxonomyToForm(taxonomy)};
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
          initialValues={_initialState}
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
  serviceCategoriesActions: PropTypes.shape({
    getCategories: PropTypes.func,
  }),
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

export default ServiceFormContainer;

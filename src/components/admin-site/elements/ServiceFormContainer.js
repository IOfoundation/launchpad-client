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
  servicesAreas: [],
  audience: '',
  eligibility: '',
  fees: '',
  acceptedPaymentMethods: [],
  fundingSources: [],
  hoursRegular: [],
  delete_hoursRegular: [],
  hoursHolidays: [],
  delete_hoursHolidays: [],
  applicationProcess: '',
  requiredDocuments: [],
  serviceLanguages: [],
  interpretationServices: '',
  waitTime: '',
  keywords: '',
  taxonomy: {},
  locationId: '',
  phones: [],
  deletedPhones: [],
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
      initialTaxonomy,
      checkboxes,
    } = this.props;

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
              <ServiceForm
                {..._props}
                goToLocation={this.goToLocation}
                checkboxes={checkboxes}
              />
            </Fragment>
          )}
          initialValues={{...initialValues, ...initialTaxonomy}}
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
  checkboxes: PropTypes.arrayOf(PropTypes.shape({})),
  error: PropTypes.bool,
  initialTaxonomy: PropTypes.shape({}),
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

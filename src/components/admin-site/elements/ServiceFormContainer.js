import React, {Fragment, PureComponent} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';

import Buttons from '../Buttons';
import LandingComponent from '../Landing';
import Modal from './Service/Modal';
import ServiceForm from './ServiceForm';
import Title from '../Title';

import serviceModel from './Service/Model';
import getInitialValues from './Service/initialValues';

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
  state = {
    openModal: false,
  };

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

    this._deleteSuccess(prevProps);
    this._deleteError(prevProps);
  }

  _deleteSuccess = prevProps => {
    const {serviceDeleteSuccess, snackbar} = this.props;

    if (serviceDeleteSuccess !== prevProps.serviceDeleteSuccess) {
      if (serviceDeleteSuccess) {
        snackbar.showSnackbar({
          message: 'Service deleted succesfully',
        });
        this.goToLocation();
      }
    }
  };

  _deleteError = prevProps => {
    const {serviceDeleteError, snackbar} = this.props;

    if (serviceDeleteError !== prevProps.serviceDeleteError) {
      if (serviceDeleteError) {
        snackbar.showSnackbar({
          message: 'There was a problem trying to delete the service',
        });
      }
    }
  };

  goToLocation = () => {
    const {router, locationId} = this.props;

    router.push(`/admin/location/${locationId}`);
  };

  handlerModalVisibility = () => {
    this.setState(prevState => {
      return {
        openModal: !prevState.openModal,
      };
    });
  };

  deleteService = () => {
    const {Authorization, serviceDelete, locationId, router} = this.props;

    serviceDelete.remove({
      Authorization,
      serviceId: router.params.id,
      locationId,
    });
  };

  render() {
    const {
      locationId,
      Authorization,
      serviceCreate,
      locationName,
      initialTaxonomy,
      checkboxes,
      serviceData,
      router,
    } = this.props;
    let formModel;
    let mode;

    if (router.params.id === 'new') {
      mode = 'new';
      formModel = {
        ...initialValues,
        ...initialTaxonomy,
      };
    } else {
      mode = 'edit';
      formModel = {
        ...initialValues,
        ...getInitialValues(serviceData, initialTaxonomy),
      };
    }

    return (
      <LandingComponent>
        <Modal
          open={this.state.openModal}
          modalClosed={this.handlerModalVisibility}
          cancelClicked={this.handlerModalVisibility}
          deleteClicked={this.deleteService}
        />
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
                openModal={this.handlerModalVisibility}
              />
              <Buttons
                hideCancelAction={false}
                submitLabel={'Save Service'}
                cancelClicked={this.goToLocation}
                submitClicked={_props.submitForm}
              />
            </Fragment>
          )}
          initialValues={{...formModel}}
          validationSchema={SignupSchema}
          onSubmit={values => {
            serviceCreate.create({
              service: serviceModel(values),
              Authorization,
              locationId,
              serviceId: router.params.id,
              mode,
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
    push: PropTypes.func.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  seriveCreateErrors: PropTypes.arrayOf(PropTypes.shape({})),
  serviceCategoriesActions: PropTypes.shape({
    getCategories: PropTypes.func,
  }),
  serviceCreate: PropTypes.shape({
    create: PropTypes.func,
  }),
  serviceCreateError: PropTypes.bool.isRequired,
  serviceData: PropTypes.shape({}).isRequired,
  serviceDelete: PropTypes.shape({
    remove: PropTypes.func.isRequired,
  }),
  serviceDeleteError: PropTypes.bool.isRequired,
  serviceDeleteSuccess: PropTypes.bool.isRequired,
  serviceUpdated: PropTypes.shape({}).isRequired,
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  success: PropTypes.bool,
  userActions: PropTypes.shape({
    login: PropTypes.func,
  }),
};

export default ServiceFormContainer;

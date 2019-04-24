import React, {Fragment, PureComponent} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

import EditMode from './EditMode';

import * as user from '@Actions/user';
import * as snackbarActions from '@Actions/snackbar';
import * as eventsCreateActions from '@Actions/events/create';
import formModel from './Model';

export const FormSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  website: Yup.string()
    .url('URL invalid')
    .notRequired(),
  description: Yup.string(),
  address: Yup.string().required('Required'),
  address2: Yup.string(),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zip: Yup.string().required('Required'),
  startDate: Yup.string().required('Required'),
  endDate: Yup.string().required('Required'),
  startTime: Yup.string(),
  endTime: Yup.string(),
  allDay: Yup.string(),
});

const initialValues = {
  title: '',
  website: '',
  description: '',
  address: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  allDay: '',
};

class FormWrapper extends PureComponent {
  componentDidUpdate(prevProps) {
    this._verifyCreateSuccess(prevProps);
    this._verifyCreateError(prevProps);
  }

  _verifyCreateSuccess = prevProps => {
    const {createSucces, snackbar, closeClicked, refreshData} = this.props;

    if (createSucces !== prevProps.createSucces) {
      if (createSucces) {
        snackbar.showSnackbar({
          message: 'Event created succesfully',
        });
        closeClicked();
        refreshData();
      }
    }
  };

  _verifyCreateError = prevProps => {
    const {createError, createErrors, snackbar, closeClicked} = this.props;

    if (createError !== prevProps.createError) {
      let message = 'An error has ocurred';

      if (createErrors.length > 0 && createErrors[0].title) {
        message = createErrors[0].title;
      }

      if (createError) {
        snackbar.showSnackbar({
          message,
        });
      }
      closeClicked();
    }
  };

  render() {
    const {
      breakpoint,
      closeClicked,
      Authorization,
      eventsCreate,
      organizationId,
    } = this.props;

    return (
      <Formik
        enableReinitialize={true}
        render={_props => (
          <Fragment>
            <h1 className="events-form-title">{'Create An Event'}</h1>
            <EditMode
              {..._props}
              breakpoint={breakpoint}
              closeClicked={closeClicked}
            />
          </Fragment>
        )}
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={values => {
          eventsCreate.create({
            Authorization,
            event: formModel(values),
            mode: 'new',
            organizationId,
          });
        }}
      />
    );
  }
}

const mapStateToProps = _state => {
  const organizationId =
    _state.user.organizationId || sessionStorage.getItem('organizationId');
  const Authorization =
    _state.user.authorization || sessionStorage.getItem('userAuth');

  return {
    Authorization,
    organizationId,
    createSucces: _state.eventsCreate.success,
    createError: _state.eventsCreate.error,
    createErrors: _state.eventsCreate.errors,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    userActions: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
    eventsCreate: bindActionCreators(eventsCreateActions, _dispatch),
  };
};

FormWrapper.propTypes = {
  Authorization: PropTypes.string,
  breakpoint: PropTypes.string,
  business: PropTypes.shape({
    fetchOrganizationById: PropTypes.func,
  }),
  closeClicked: PropTypes.func,
  createError: PropTypes.bool,
  createErrors: PropTypes.arrayOf(PropTypes.shape({})),
  createSucces: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.shape({})),
  eventsCreate: PropTypes.shape({
    create: PropTypes.func,
  }),
  isAuth: PropTypes.bool,
  organization: PropTypes.shape({}),
  organizationId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  profile: PropTypes.shape({
    updateCompany: PropTypes.func,
  }),
  refreshData: PropTypes.func,
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
)(withRouter(FormWrapper));

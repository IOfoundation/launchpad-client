import React, {Fragment} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

import EditMode from './EditMode';

import * as user from '@Actions/user';
import * as snackbarActions from '@Actions/snackbar';

export const FormSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  website: Yup.string()
    .url('URL invalid')
    .notRequired(),
  description: Yup.string(),
  address: Yup.string(),
  address2: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  zip: Yup.string(),
  startDate: Yup.string(),
  endDate: Yup.string(),
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

const FormWrapper = props => {
  const {breakpoint, closeClicked} = props;

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
      onSubmit={() => {}}
    />
  );
};

const mapStateToProps = _state => {
  const organizationId =
    _state.user.organizationId || sessionStorage.getItem('organizationId');
  const auth = _state.user.authorization || sessionStorage.getItem('userAuth');

  return {
    auth,
    organizationId,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    userActions: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

FormWrapper.propTypes = {
  auth: PropTypes.string,
  breakpoint: PropTypes.string,
  business: PropTypes.shape({
    fetchOrganizationById: PropTypes.func,
  }),
  closeClicked: PropTypes.func,
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
)(withRouter(FormWrapper));

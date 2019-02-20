import React from 'react';
import PasswordResetForm from './PasswordResetForm';
import {Formik} from 'formik';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';

import * as user from '../../../actions/user';
import * as snackbarActions from '../../../actions/snackbar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
});

const initialValues = {email: ''};

const PasswordResetContainer = props => {
  return (
    <Grid item={true} xs={12} md={5}>
      <Formik
        render={_props => <PasswordResetForm {..._props} />}
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, {setSubmitting}) => {
          props.user.passwordRecovery({email: values.email}).then(() => {
            props.snackbar.showSnackbar({
              message: 'Email Sent',
            });
            setSubmitting(false);
          });
        }}
        validateOnChange={false}
      />
    </Grid>
  );
};

const mapDispatchToProps = _dispatch => {
  return {
    user: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

PasswordResetContainer.propTypes = {
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  user: PropTypes.shape({
    passwordRecovery: PropTypes.func,
  }),
};

export default connect(
  null,
  mapDispatchToProps
)(PasswordResetContainer);

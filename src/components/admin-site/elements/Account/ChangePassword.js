import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import FormTextField from '@Shared/FormElements/TextFieldDefault';

export const ChangePassword = props => {
  const {errors, touched, handleBlur, handleChange, values, classes} = props;

  return (
    <div className="m-bot-40">
      <h2 className={classes.title}>{'Change Password'}</h2>
      <p className={classes.description}>
        {'You must enter your current password to make changes.'}
      </p>
      <Grid container={true} spacing={16}>
        <Grid item={true} xs={5}>
          <FormTextField
            autocomplete="user-password"
            error={touched.currentPassword && Boolean(errors.currentPassword)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'currentPassword'}
            label={'Current Password'}
            value={values.currentPassword}
            type="password"
          />
        </Grid>
      </Grid>
      <Grid container={true} spacing={16}>
        <Grid item={true} xs={5}>
          <FormTextField
            autocomplete={'off'}
            error={touched.newPassword && Boolean(errors.newPassword)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'newPassword'}
            label={'New Password'}
            value={values.newPassword}
            type="password"
          />
        </Grid>
        <Grid item={true} xs={5}>
          <FormTextField
            autocomplete={'off'}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'confirmPassword'}
            label={'Password Confirmation'}
            value={values.confirmPassword}
            type="password"
          />
        </Grid>
      </Grid>
    </div>
  );
};

const styles = () => {
  return {
    title: {
      borderBottom: '2px solid black',
      color: 'black',
      fontFamily: '"proxima-nova-bold", Georgia, sans-serif',
      fontSize: '14px',
      lineHeight: '20px',
      marginBottom: '28px',
      paddingBottom: '8px',
    },
    description: {
      color: 'black',
      fontSize: '14px',
      lineHeight: '20px',
      marginBottom: '12px',
    },
  };
};

ChangePassword.propTypes = {
  classes: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(styles)(ChangePassword);

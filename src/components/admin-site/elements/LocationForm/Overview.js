import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FormTextField from '../../../shared/FormElements/TextFieldDefault';
import {sharedStyles, sharedClasses} from './styles';
import Checkbox from '../../../shared/FormElements/Checkbox';

export const Overview = props => {
  const {errors, touched, handleBlur, handleChange, values, classes} = props;

  return (
    <div className="m-bot-40">
      <h2 className={classes.title}>{'Overview'}</h2>
      <Checkbox
        label="Check if this is the main location"
        name="handleChange"
        onChange={handleChange}
        value={values.handleChange}
      />
      <div className={classes.wrapper}>
        <div className={classes.halfs}>
          <FormTextField
            autocomplete={'off'}
            error={touched.locationName && Boolean(errors.locationName)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'locationName'}
            label={'Location Name'}
            value={values.locationName}
          />
        </div>
        <div className={classes.halfs}>
          <FormTextField
            autocomplete={'off'}
            error={touched.alternateName && Boolean(errors.alternateName)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            helperText="This is how the name will appear to other users."
            id={'alternateName'}
            label={'Alternate Name'}
            value={values.alternateName}
          />
        </div>

        <FormTextField
          autocomplete={'off'}
          error={
            touched.locationDescription && Boolean(errors.locationDescription)
          }
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          helperText="A description of the location's services."
          id={'locationDescription'}
          label={'Description'}
          multiline={true}
          value={values.locationDescription}
        />
      </div>
    </div>
  );
};

Overview.propTypes = {
  classes: sharedClasses,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(Overview);

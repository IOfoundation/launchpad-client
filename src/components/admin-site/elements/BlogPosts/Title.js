import React from 'react';
import {PropTypes} from 'prop-types';
import Grid from '@material-ui/core/Grid';

import TitleField from '@Shared/FormElements/TitleField';

export const Title = props => {
  const {errors, touched, handleBlur, handleChange, values} = props;

  return (
    <div className="m-bot-8">
      <Grid container={true}>
        <Grid item={true} xs={12}>
          <TitleField
            autocomplete="off"
            error={touched.title && Boolean(errors.title)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id="title"
            name="title"
            label="Add a title..."
            value={values.title}
            multiline={true}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Title.propTypes = {
  classes: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default Title;

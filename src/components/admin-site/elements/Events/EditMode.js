import React from 'react';
import {Form} from 'formik';
import {PropTypes} from 'prop-types';
import Grid from '@material-ui/core/Grid';

import FormTextField from '@Shared/FormElements/EventTextField';
import Checkbox from '@Shared/FormElements/Checkbox';
import SelectElement from '@Shared/FormElements/Select';

import {states} from '@StaticData/data';

const EditMode = props => {
  const {
    closeClicked,
    errors,
    handleBlur,
    handleChange,
    touched,
    values,
    mode,
  } = props;
  let startTime;
  let endTime;
  const buttonLabel = mode === 'edit' ? 'Update Event' : 'Create Event';

  if (!values.allDay) {
    startTime = (
      <FormTextField
        autocomplete="off"
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        id="startTime"
        label="Start Time"
        name="startTime"
        value={values.startTime}
        type="time"
      />
    );
    endTime = (
      <FormTextField
        autocomplete="off"
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        id="endTime"
        label="End Time"
        name="endTime"
        value={values.endTime}
        type="time"
      />
    );
  }

  return (
    <Form className="profile-form" style={{padding: 8}}>
      <Grid container={true} spacing={16}>
        <Grid item={true} xs={12} md={6}>
          <FormTextField
            autocomplete="off"
            error={touched.title && Boolean(errors.title)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id="title"
            name="title"
            label="Event Title"
            value={values.title}
          />
          <FormTextField
            autocomplete="off"
            error={touched.website && Boolean(errors.website)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id="website"
            name="website"
            label="Event URL"
            value={values.website}
          />
          <FormTextField
            autocomplete="off"
            error={touched.description && Boolean(errors.description)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'description'}
            label={'Event Description'}
            multiline={true}
            value={values.description}
            rowsMax="12"
          />
        </Grid>
        <Grid item={true} xs={12} md={6}>
          <FormTextField
            autocomplete="off"
            error={touched.address && Boolean(errors.address)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id="address"
            name="address"
            label="Address"
            value={values.address}
          />
          <FormTextField
            autocomplete="off"
            error={touched.address2 && Boolean(errors.address2)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id="address2"
            name="address2"
            label="Address (Line 2)"
            value={values.address2}
          />
          <div style={{padding: '8px 0'}}>
            <Grid container={true} spacing={16}>
              <Grid item={true} xs={12} sm={6}>
                <FormTextField
                  autocomplete="off"
                  error={touched.city && Boolean(errors.city)}
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  id="city"
                  name="city"
                  label="City"
                  value={values.city}
                />
              </Grid>
              <Grid item={true} xs={12} sm={3}>
                <SelectElement
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  id={'state'}
                  label={'State'}
                  name={'state'}
                  selectOptions={states}
                  value={values.state}
                />
              </Grid>
              <Grid item={true} xs={12} sm={3}>
                <FormTextField
                  autocomplete="off"
                  error={touched.zip && Boolean(errors.zip)}
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  id="zip"
                  name="zip"
                  label="Zipcode"
                  value={values.zip}
                />
              </Grid>
            </Grid>
          </div>
          <Grid container={true} spacing={16}>
            <Grid item={true} xs={12} sm={5}>
              <FormTextField
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
                id="startDate"
                label="Start Date"
                name="startDate"
                value={values.startDate}
                type="date"
              />
            </Grid>
            <Grid item={true} xs={12} sm={4}>
              {startTime}
            </Grid>
          </Grid>
          <Grid container={true} spacing={16}>
            <Grid item={true} xs={12} sm={5}>
              <FormTextField
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
                id="endDate"
                label="End Date"
                name="endDate"
                value={values.endDate}
                type="date"
              />
            </Grid>
            <Grid item={true} xs={12} sm={4}>
              {endTime}
            </Grid>
          </Grid>

          <Checkbox
            label="All Day Event"
            name="allDay"
            onChange={handleChange}
            value={values.allDay}
          />
          <Grid
            container={true}
            spacing={16}
            justify="flex-end"
            alignContent="center"
            alignItems="center"
          >
            <Grid item={true} className="m-x-8">
              <button
                className="btn btn__outline"
                type="button"
                onClick={closeClicked}
              >
                {'Cancel'}
              </button>
            </Grid>
            <Grid item={true}>
              <button className="btn btn__black p-x-24" type="submit">
                {buttonLabel}
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  );
};

EditMode.propTypes = {
  closeClicked: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  mode: PropTypes.string,
  touched: PropTypes.shape({}).isRequired,
  values: PropTypes.shape({}).isRequired,
};

export default EditMode;

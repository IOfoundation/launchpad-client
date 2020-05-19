import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Checkbox from '@Shared/FormElements/Checkbox';

import {sharedStyles, sharedClasses} from './styles';

class Accessibility extends PureComponent {
  handleChange = event => {
    const {handleChange} = this.props;
    handleChange(event);
  };

  render() {
    const {values, classes} = this.props;

    return (
      <div className={classes.card}>
        <div className={classes.cardTitle}>
          <span className={`${classes.cardTitle}__media`}>
            {'Accessibility Options'}
          </span>
        </div>
        <div className={classes.cardContent}>
          <Grid container={true} spacing={16}>
            <Grid item={true} xs={12} md={6} className="p-bot-0">
              <Checkbox
                label="Information on CD"
                name="accessibility.cd"
                onChange={this.handleChange}
                value={values.accessibility.cd}
              />
              <Checkbox
                label="Interpreter for the deaf"
                name="accessibility.deafInterpreter"
                onChange={this.handleChange}
                value={values.accessibility.deafInterpreter}
              />
              <Checkbox
                label="Disabled Parking"
                name="accessibility.disabledParking"
                onChange={this.handleChange}
                value={values.accessibility.disabledParking}
              />
              <Checkbox
                label="Elevator"
                name="accessibility.elevator"
                onChange={this.handleChange}
                value={values.accessibility.elevator}
              />
              <Checkbox
                label="Ramp"
                name="accessibility.ramp"
                onChange={this.handleChange}
                value={values.accessibility.ramp}
              />
            </Grid>
            <Grid item={true} xs={12} md={6} className="p-top-0">
              <Checkbox
                label="Disabled Restroom"
                name="accessibility.restroom"
                onChange={this.handleChange}
                value={values.accessibility.restroom}
              />
              <Checkbox
                label="Information on tape or in Braille"
                name="accessibility.tapeBraille"
                onChange={this.handleChange}
                value={values.accessibility.tapeBraille}
              />
              <Checkbox
                label="TTY"
                name="accessibility.tty"
                onChange={this.handleChange}
                value={values.accessibility.tty}
              />
              <Checkbox
                label="Wheelchair"
                name="accessibility.wheelchair"
                onChange={this.handleChange}
                value={values.accessibility.wheelchair}
              />
              <Checkbox
                label="Wheelchair-accessible van"
                name="accessibility.wheelchairVan"
                onChange={this.handleChange}
                value={values.accessibility.wheelchairVan}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Accessibility.propTypes = {
  classes: sharedClasses,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(Accessibility);

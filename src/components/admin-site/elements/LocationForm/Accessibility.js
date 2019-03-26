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
                name="accessibility.informationOnCd"
                onChange={this.handleChange}
                value={values.accessibility.informationOnCd}
              />
              <Checkbox
                label="Interpreter for the deaf"
                name="accessibility.interpreterForTheDeaf"
                onChange={this.handleChange}
                value={values.accessibility.interpreterForTheDeaf}
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
                name="accessibility.disabledRestroom"
                onChange={this.handleChange}
                value={values.accessibility.disabledRestroom}
              />
              <Checkbox
                label="Information on tape or in Braille"
                name="accessibility.informationOnTapeOrInBraille"
                onChange={this.handleChange}
                value={values.accessibility.informationOnTapeOrInBraille}
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
                name="accessibility.wheelchairAccessibleVan"
                onChange={this.handleChange}
                value={values.accessibility.wheelchairAccessibleVan}
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

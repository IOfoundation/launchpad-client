import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles, sharedClasses} from '../LocationForm/styles';
import Grid from '@material-ui/core/Grid';

import Checkbox from '../../../shared/FormElements/Checkbox';

class CheckboxGroup extends PureComponent {
  handleChange = event => {
    const {handleChange} = this.props;
    handleChange(event);
  };

  render() {
    const {values, classes, data, group, title, md = 12} = this.props;

    return (
      <div className={classes.card}>
        <div className={classes.cardTitle}>
          <span className={`${classes.cardTitle}__media`}>{title}</span>
        </div>

        <div className={classes.cardContent}>
          <Grid container={true} spacing={16}>
            <Grid item={true} xs={12} md={md}>
              {data.leftColumn &&
                data.leftColumn.map((item, index) => {
                  return (
                    <Checkbox
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      label={item.label}
                      name={`${group}.${item.key}`}
                      onChange={this.handleChange}
                      value={values[group] && values[group][item.key]}
                    />
                  );
                })}
            </Grid>
            <Grid item={true} xs={12} md={md}>
              {data.rightColumn &&
                data.rightColumn.map((item, index) => {
                  return (
                    <Checkbox
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      label={item.label}
                      name={`${group}.${item.key}`}
                      onChange={this.handleChange}
                      value={values[group] && values[group][item.key]}
                    />
                  );
                })}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

CheckboxGroup.propTypes = {
  classes: sharedClasses,
  data: PropTypes.shape({
    leftColumn: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
      })
    ),
    rightColumn: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
      })
    ),
  }),
  errors: PropTypes.shape({}),
  group: PropTypes.string,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  md: PropTypes.number,
  title: PropTypes.string,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(CheckboxGroup);

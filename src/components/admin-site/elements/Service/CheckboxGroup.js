import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles, sharedClasses} from '../LocationForm/styles';
import Grid from '@material-ui/core/Grid';

import Checkbox from '../../../shared/FormElements/Checkbox';
import WarningCategoryModal from './WarningCategoryModal';

class CheckboxGroup extends PureComponent {
  state = {
    openModal: false,
  };

  handleChange = (event, update) => {
    const {handleChange, disable} = this.props;

    if (!disable || update) {
      handleChange(event);
    }
  };

  handlerModalVisibility = () => {
    this.setState(prevState => {
      return {
        openModal: !prevState.openModal,
      };
    });
  };

  render() {
    const {values, classes, data, group, title, md = 12, disable} = this.props;

    return (
      <div className={classes.card}>
        <WarningCategoryModal
          open={this.state.openModal}
          modalClosed={this.handlerModalVisibility}
          cancelClicked={this.handlerModalVisibility}
          deleteClicked={this.handlerModalVisibility}
        />
        <div className={classes.cardTitle}>
          <span className={`${classes.cardTitle}__media`}>{title}</span>
        </div>
        <div className={classes.cardContent}>
          <Grid container={true} spacing={16}>
            <Grid item={true} xs={12} md={md} className="p-bot-0">
              {data.leftColumn &&
                data.leftColumn.map((item, index) => {
                  return (
                    <Checkbox
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      label={item.label}
                      name={`taxonomy.${group}.${item.key}`}
                      handlerModalVisibility={this.handlerModalVisibility}
                      onChange={(event, update) =>
                        this.handleChange(event, update)
                      }
                      value={
                        values.taxonomy[group] &&
                        values.taxonomy[group][item.key]
                      }
                      maxPicks={disable}
                    />
                  );
                })}
            </Grid>
            <Grid item={true} xs={12} md={md} className="p-top-0">
              {data.rightColumn &&
                data.rightColumn.map((item, index) => {
                  return (
                    <Checkbox
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      label={item.label}
                      name={`taxonomy.${group}.${item.key}`}
                      handlerModalVisibility={this.handlerModalVisibility}
                      onChange={this.handleChange}
                      value={
                        values.taxonomy[group] &&
                        values.taxonomy[group][item.key]
                      }
                      maxPicks={disable}
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
  disable: PropTypes.bool,
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

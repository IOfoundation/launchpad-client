import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import SelectElement from '@Shared/FormElements/Select';

import {getDate} from '@Utils';

export const DateCategory = props => {
  const {
    errors,
    handleBlur,
    handleChange,
    values,
    classes,
    categories,
    breakpoint,
  } = props;

  const selectCategories = categories.map(categorie => ({
    value: String(categorie.id),
    name: categorie.name,
  }));
  const date = getDate();
  const dateText = `${date.monthLarge} ${date.day}, ${date.year}`;
  let style = {};
  let spacing = 0;

  if (breakpoint === 'xs') {
    style = {padding: '8px 0'};
    spacing = 16;
  }

  return (
    <div className="m-bot-8" style={style}>
      <Grid container={true} spacing={spacing} alignItems="center">
        <Grid item={true} xs={12} md={8} className={classes.date}>
          {`Started, ${dateText}`}
        </Grid>
        <Grid item={true} xs={12} md={4} style={{marginTop: '8px'}}>
          <SelectElement
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'category'}
            label={'Select Category'}
            name={'category'}
            value={values.category}
            selectOptions={selectCategories}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const styles = theme => {
  return {
    date: {
      color: theme.palette.grey.one,
    },
  };
};

DateCategory.propTypes = {
  breakpoint: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  classes: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(styles)(DateCategory);

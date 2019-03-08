import React from 'react';
import {PropTypes} from 'prop-types';

const Category = props => {
  const {label, className, clicked, isSelected} = props;
  const classes = ['blog-categories capitalize', className];

  if (isSelected) {
    classes.push('blog-categories__list__selected');
  }

  return (
    <li className={classes.join(' ')} onClick={clicked}>
      {label}
    </li>
  );
};

Category.propTypes = {
  className: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  isSelected: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default Category;

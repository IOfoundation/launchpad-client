import React from 'react';
import {Link} from 'react-router';
import {PropTypes} from 'prop-types';

const Category = props => {
  const {to, label, className} = props;

  return (
    <li className={['post-category', className].join(' ')}>
      <Link to={to}>{label}</Link>
    </li>
  );
};

Category.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default Category;

import React from 'react';
import {Link} from 'react-router';
import {PropTypes} from 'prop-types';

const Category = props => {
  const {to, label} = props;

  return (
    <li className="post-category">
      <Link to={to}>{label}</Link>
    </li>
  );
};

Category.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default Category;

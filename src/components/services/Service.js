import React from 'react';
import {PropTypes} from 'prop-types';

const Service = ({service}) => {
  return <li>{service.name}</li>;
};

Service.propTypes = {
  services: PropTypes.object,
};

export default Service;

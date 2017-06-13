import React from 'react';
import {PropTypes} from 'prop-types';

const Service = ({service, handleClickOnServiceTag}) => {
  return (
    <li onClick={() => handleClickOnServiceTag(service.id)}>{service.name}</li>
  );
};

Service.propTypes = {
  handleClickOnServiceTag: PropTypes.func.isRequired,
  service: PropTypes.object.isRequired,
};

export default Service;

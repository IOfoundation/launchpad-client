import React from 'react';
import {PropTypes} from 'prop-types';

const Service = ({service, handleClickOnServiceTag}) => {
  return (
    <li onClick={() => handleClickOnServiceTag(service.id)}>{service.name}</li>
  );
};

Service.propTypes = {
  service: PropTypes.object.isRequired,
  handleClickOnServiceTag: PropTypes.func.isRequired,
};

export default Service;

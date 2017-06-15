import React from 'react';
import {PropTypes} from 'prop-types';

const Service = ({service, handleClickOnServiceTag}) => {
  return (
    <button
      className="browseBy_btn"
      onClick={() => handleClickOnServiceTag(service.id)}
    >
      {service.name}
    </button>
  );
};

Service.propTypes = {
  handleClickOnServiceTag: PropTypes.func.isRequired,
  service: PropTypes.object.isRequired,
};

export default Service;

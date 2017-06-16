import React from 'react';
import {PropTypes} from 'prop-types';
import Service from './Service';

const ServicesBox = ({services, handleClickOnServiceTag}) => {
  return (
    <div>
      {services.map(service => (
        <Service
          key={service.id}
          service={service}
          handleClickOnServiceTag={handleClickOnServiceTag}
        />
      ))}
    </div>
  );
};

ServicesBox.propTypes = {
  handleClickOnServiceTag: PropTypes.func.isRequired,
  services: PropTypes.array.isRequired,
};

export default ServicesBox;

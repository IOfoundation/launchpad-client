import React from 'react';
import {PropTypes} from 'prop-types';
import Service from './Service';

const ServicesBox = ({services, handleClickOnServiceTag}) => {
  return (
    <div>
      <ul>
        {services.map(service => (
          <Service key={service.id} service={service} handleClickOnServiceTag={handleClickOnServiceTag} />
        ))}
      </ul>
    </div>
  );
};

ServicesBox.propTypes = {
  services: PropTypes.array.isRequired,
  handleClickOnServiceTag: PropTypes.func.isRequired
};

export default ServicesBox;

import React from 'react';
import {PropTypes} from 'prop-types';
import Service from './Service';

const ServicesBox = ({services}) => {
  return (
    <div>
      <ul>
        {services.map(service => (
          <Service key={service.id} service={service} />
        ))}
      </ul>
    </div>
  );
};

ServicesBox.propTypes = {
  services: PropTypes.array,
};

export default ServicesBox;

import React from 'react';
import Service from './Service';
import {PropTypes} from 'prop-types';

const ServicesOffered = props => {
  const {services} = props;
  let $services = null;

  if (services) {
    $services = services.map(service => {
      if (service.email) {
        return (
          <Service
            key={service.id}
            title={service.name}
            content={service.description}
            extra={{label: 'Email', content: service.email}}
          />
        );
      }

      return (
        <Service
          key={service.id}
          title={service.name}
          content={service.description}
        />
      );
    });
  }

  return (
    <div className="services-offered">
      <h2 className="services-offered__title text-semi">
        {'Services Offered'}
      </h2>
      {$services}
    </div>
  );
};

ServicesOffered.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      email: PropTypes.string,
    })
  ),
};

export default ServicesOffered;

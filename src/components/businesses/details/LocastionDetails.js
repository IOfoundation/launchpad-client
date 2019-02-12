import React from 'react';
import {PropTypes} from 'prop-types';

const LocationDetails = props => {
  const {organization} = props;

  return (
    <div className="location-deatils">
      <p>
        <span className="text-bold">{'Street Address: '}</span>
        {`${organization.address.address_1}, ${organization.address.address_2},
              ${organization.address.state_province} ${
          organization.address.postal_code
        }`}
      </p>
      <p>
        <span className="text-bold">
          {'Phone: '}
          {organization.phone && organization.phone[0].number}
        </span>
      </p>
      <p>
        <span className="text-bold">
          {'Email: '}
          {organization.email}
        </span>
      </p>
      <p>
        <span className="text-bold">
          {'Website: '}
          {organization.website}
        </span>
      </p>
      <p className="text-bold">{'Description: '}</p>
      <p>{organization.description}</p>
      <p className="text-bold">{'Hours of Operation: '}</p>
      <p />
      <p>
        <span className="text-bold">
          {'Languages This Service is Provided In: '}
        </span>
      </p>
      <p>
        <span className="text-bold">{'Transportation Services: '}</span>
      </p>
      <p>
        <span className="text-bold">{'Accessibility Options: '}</span>
      </p>
    </div>
  );
};

LocationDetails.propTypes = {
  organization: PropTypes.shape({
    address: PropTypes.shape({
      address_1: PropTypes.string,
      address_2: PropTypes.string,
      state_province: PropTypes.string,
      postal_code: PropTypes.string,
    }),
    phone: PropTypes.arrayOf({
      number: PropTypes.string,
    }),
    email: PropTypes.string,
    website: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default LocationDetails;

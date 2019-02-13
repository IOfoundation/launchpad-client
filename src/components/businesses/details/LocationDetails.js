import React from 'react';
import {PropTypes} from 'prop-types';

const LocationDetails = props => {
  const {organization, closeModal} = props;

  return (
    <div className="location-details">
      <i className="material-icons location-details__icon" onClick={closeModal}>
        {'close'}
      </i>
      <h2 className="location-details__title">{organization.name}</h2>
      <p className="location-details__section">
        <span className="text-bold">{'Street Address: '}</span>
        {`${organization.address.address_1}, ${organization.address.address_2},
              ${organization.address.state_province} ${
          organization.address.postal_code
        }`}
      </p>
      <p className="location-details__section">
        <span className="text-bold">
          {'Phone: '}
          {organization.phone && organization.phone[0].number}
        </span>
      </p>
      <p className="location-details__section">
        <span className="text-bold">
          {'Email: '}
          {organization.email}
        </span>
      </p>
      <p className="location-details__section location-details__section--extra-space">
        <span className="text-bold">
          {'Website: '}
          {organization.website}
        </span>
      </p>
      <h3 className="location-details__subtitle text-bold">
        {'Description: '}
      </h3>
      <p className="location-details__bottom-space">
        {organization.description}
      </p>
      <h3 className="location-details__subtitle text-bold">
        {'Hours of Operation: '}
      </h3>
      <p className="location-details__bottom-space">
        {'Monday: Opens at 8:00 AM, Closes at 5:00 PM'}
      </p>
      <h3 className="location-details__subtitle text-bold">
        {'Languages This Service is Provided In: '}
      </h3>
      <p className="location-details__bottom-space">
        {'American Sign Language, Cambodian, English, French, Spanish'}
      </p>
      <h3 className="location-details__subtitle text-bold">
        {'Transportation Services: '}
      </h3>
      <p className="location-details__bottom-space">
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam imperdiet mauris justo, vel ornare magna ornare tempor. Quisque gravida ante vel est luctus rhoncus. Ut tincidunt est ac ex blandit pulvinar.'
        }
      </p>
      <h3 className="location-details__subtitle text-bold">
        {'Accessibility Options: '}
      </h3>
      <p className="location-details__bottom-space">
        {'Disabled Parking, Elevator, Ramp, TTY, Wheelchair'}
      </p>
    </div>
  );
};

LocationDetails.propTypes = {
  closeModal: PropTypes.func,
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

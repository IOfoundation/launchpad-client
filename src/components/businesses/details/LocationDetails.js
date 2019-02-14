import React from 'react';
import {PropTypes} from 'prop-types';
import LocationDetailsSmallSection from './LocationDetails/LocationDetailsSmallSection';
import LocationDetailsSection from './LocationDetails/LocationDetailsSection';

const LocationDetails = props => {
  const {organization, closeModal} = props;

  const address = `${organization.address.address_1}, ${organization.address
    .address_2},
  ${organization.address.state_province} ${organization.address.postal_code}`;

  console.log(organization);
  return (
    <div className="location-details">
      <i className="material-icons location-details__icon" onClick={closeModal}>
        {'close'}
      </i>
      <h2 className="location-details__title">{organization.name}</h2>
      <LocationDetailsSmallSection title="Street Address" content={address} />
      <LocationDetailsSmallSection
        title="Phone"
        content={organization.phone && organization.phone[0].number}
      />
      <LocationDetailsSmallSection title="Email" content={organization.email} />
      <LocationDetailsSmallSection
        title="Website"
        content={organization.website}
      />
      <LocationDetailsSection
        title="Description"
        content={organization.description}
      />
      <LocationDetailsSection
        title="Hours of Operation"
        content={'Monday: Opens at 8:00 AM, Closes at 5:00 PM'}
      />
      <LocationDetailsSection
        title="Languages This Service is Provided In"
        content={'American Sign Language, Cambodian, English, French, Spanish'}
      />
      <LocationDetailsSection
        title="Transportation Services"
        content={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam imperdiet mauris justo, vel ornare magna ornare tempor. Quisque gravida ante vel est luctus rhoncus. Ut tincidunt est ac ex blandit pulvinar.'
        }
      />
      <LocationDetailsSection
        title="Accessibility Options"
        content={'Disabled Parking, Elevator, Ramp, TTY, Wheelchair'}
      />
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

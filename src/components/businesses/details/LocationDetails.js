import React from 'react';
import {PropTypes} from 'prop-types';
import SmallSection from './LocationDetails/SmallSection';
import Section from './LocationDetails/Section';
import RegularSchedules from './LocationDetails/RegularSchedules';
import FromString from './LocationDetails/FromString';

const getAddress = ({
  address_1,
  address_2,
  state_province,
  city,
  postal_code,
}) => {
  let address = '';

  if (address_2) {
    address = `${address_1}, ${address_2}, ${city}, ${state_province}, ${postal_code}`;
  } else {
    address = `${address_1}, ${city}, ${state_province}, ${postal_code}`;
  }

  return address;
};

const LocationDetails = props => {
  const {organization, closeModal} = props;
  let address = '';

  if (organization.address) {
    address = getAddress(organization.address);
  }

  return (
    <div className="location-details">
      <i className="material-icons location-details__icon" onClick={closeModal}>
        {'close'}
      </i>
      <h2 className="location-details__title">{organization.address.city}</h2>
      <SmallSection title="Street Address" content={address} />
      <SmallSection
        title="Phone"
        content={organization.phone && organization.phone[0].number}
      />
      <SmallSection title="Email" content={organization.email} />
      <SmallSection
        title="Website"
        content={organization.website}
        extraSpace={true}
      />
      <Section title="Description" content={organization.description} />
      <RegularSchedules schedules={organization.regular_schedules} />
      <FromString
        title="Languages This Service is Provided In"
        content={organization.languages}
      />
      <Section
        title="Transportation Services"
        content={organization.transportation}
      />
      <FromString
        title="Accessibility Options"
        content={organization.accessibility}
      />
    </div>
  );
};

LocationDetails.propTypes = {
  closeModal: PropTypes.func,
  organization: PropTypes.shape({
    accessibility: PropTypes.arrayOf(PropTypes.string),
    address: PropTypes.shape({
      address_1: PropTypes.string,
      address_2: PropTypes.string,
      state_province: PropTypes.string,
      postal_code: PropTypes.string,
    }),
    email: PropTypes.string,
    description: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
    transportation: PropTypes.string,
    phone: PropTypes.arrayOf({
      number: PropTypes.string,
    }),
    regular_schedules: PropTypes.array,
    website: PropTypes.string,
  }),
};

export default LocationDetails;

import React from 'react';
import {PropTypes} from 'prop-types';

import SmallSection from './LocationDetails/SmallSection';
import Website from './LocationDetails/Website';
import Section from './LocationDetails/Section';
import RegularSchedules from './LocationDetails/RegularSchedules';
import FromString from './LocationDetails/FromString';

import {getFirstPhoneNumber} from './Locations';

const getAddress = ({
  address_1,
  address_2,
  state_province,
  city,
  postal_code,
}) => {
  let address = '';

  if (address_2) {
    address = `${address_1}, ${address_2}, ${city}, ${state_province} ${postal_code}`;
  } else {
    address = `${address_1}, ${city}, ${state_province} ${postal_code}`;
  }

  return address;
};

const LocationDetails = props => {
  const {organization, closeModal} = props;
  let address = '';

  if (organization.address) {
    address = getAddress(organization.address);
  }

  const title = organization.alternate_name || organization.name;

  return (
    <div className="location-details">
      <i className="material-icons location-details__icon" onClick={closeModal}>
        {'close'}
      </i>
      <h2 className="location-details__title">{title}</h2>
      <div className="m-bot-20">
        <SmallSection title="Street Address" content={address} />
        <SmallSection
          title="Phone"
          content={getFirstPhoneNumber(organization.phones)}
        />
        <SmallSection title="Email" content={organization.email} />
        <Website title="Website" content={organization.website} />
      </div>
      <Section
        title="Description"
        append=""
        content={organization.description}
      />
      <RegularSchedules schedules={organization.regular_schedules} />
      <FromString
        title="Languages This Service is Provided In"
        content={organization.languages}
      />
      <Section
        title="Transportation Services"
        append=""
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

import React, {PureComponent, Fragment} from 'react';
import {withRouter} from 'react-router';

import {PropTypes} from 'prop-types';
import {isEmpty} from 'lodash';

import Chip from '@Shared/Chip';
import FacebookIcon from '@Shared/FacebookIcon';
import TwitterIcon from '@Shared/TwitterIcon';
import LinkedinIcon from '@Shared/LinkedinIcon';

import {truncate, maxCharacters} from '@Utils';

class Business extends PureComponent {
  navigateToDetails = () => {
    this.props.router.push('/businesses/' + this.props.business.id);
  };

  _renderContacts = subject => {
    return (
      <div className="col-lg-5 col-md-5 col-xs-12 p-0 main-contact">
        <p className="business-title">{'Contact:'}</p>
        {isEmpty(subject.phones) ? '' : <h4>{subject.phones[0].number}</h4>}
        {isEmpty(subject.email) ? (
          ''
        ) : (
          <h4 className="break-word">{subject.email}</h4>
        )}
      </div>
    );
  };

  _renderOtherLocationsMobile = otherLocations => {
    return (
      <div className="col-xs-12 grid p-0">
        <hr />
        <div className="col-lg-12 col-md-12 col-xs-12 grid p-0">
          {otherLocations.map(location => {
            const {address} = location;
            let addressElement;

            if (address) {
              addressElement = (
                <div className="col-xs-12 p-0 m-right-54">
                  <p className="business-title">{'Other Locations:'}</p>
                  <h4>{address.address_1}</h4>
                  {address.address_2 && <h4>{address.address_2}</h4>}
                  <h4>{`${address.city}, ${address.state_province} ${
                    address.postal_code
                  }`}</h4>
                </div>
              );
            }
            return (
              <div
                key={location.id}
                className="col-lg-12 col-md-12 col-xs-12 m-bot-24 p-0 grid"
              >
                {addressElement}
                {(location.phones.length > 0 || location.email) && (
                  <div className="col-xs-12 p-0 m-top-16">
                    <p className="business-title">{'Contact:'}</p>
                    {location.phones.length > 0 && (
                      <h4>{location.phones[0].number}</h4>
                    )}
                    {location.email && <h4>{location.email}</h4>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  _renderOtherLocations = otherLocations => {
    return (
      <div className="col-lg-12 col-md-12 col-xs-12 p-0 grid">
        {otherLocations.map(location => {
          let address = null;
          if (location.address) {
            address = (
              <div className="col-lg-6 col-md-6 col-xs-6 p-0 m-right-54">
                <h4>{location.address.address_1}</h4>
                {location.address.address_2 && (
                  <h4>{location.address.address_2}</h4>
                )}
                <h4>{`${location.address.city}, ${
                  location.address.state_province
                } ${location.address.postal_code}`}</h4>
              </div>
            );
          }

          return (
            <div
              key={location.id}
              className="col-lg-12 col-md-12 col-xs-12 m-bot-24 p-0 grid"
            >
              {address}
              <div className="col-lg-4 col-md-4 col-xs-6 p-0 m-top-24">
                {location.phones.length > 0 && (
                  <h4>{location.phones[0].number}</h4>
                )}
                {location.email && <h4>{location.email}</h4>}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  _renderMainLocations = main_location => {
    return (
      <div className="col-lg-4 col-md-4 col-xs-12 p-0 m-right-52 main-location">
        <p className="business-title">{'Main Location:'}</p>
        <h4>{main_location.address.address_1}</h4>
        {main_location.address.address_2 ? (
          <h4>{main_location.address.address_2}</h4>
        ) : (
          ''
        )}
        <h4>{`${main_location.address.city}, ${
          main_location.address.state_province
        }`}</h4>
      </div>
    );
  };

  _renderLocationInfo = locations => {
    const main_location = locations.find(location => location.is_primary);
    const locationText = locations.length === 1 ? ' Location' : ' Locations';
    const totalLocations = locations.length;
    let address = null;

    if (main_location.address !== null) {
      address = (
        <Fragment>
          <span className="m-x-7">{'|'}</span>
          <span>
            {locations.length > 1 && 'Main location in '}
            {main_location.address.city}
            {', '}
            {main_location.address.state_province}
          </span>
        </Fragment>
      );
    }

    return (
      <p className="location text-bold">
        <span>{`${totalLocations} ${locationText}`}</span>
        {address}
      </p>
    );
  };

  render() {
    const {business, isMobile} = this.props;
    const locations = business.locations;
    const main_location = locations.find(location => location.is_primary);
    const other_locations = locations.filter(location => !location.is_primary);
    let description = business.description;
    let addressElement;
    let contactElement;

    if (main_location) {
      const {address, contacts} = main_location;

      if (address) {
        addressElement =
          !isEmpty(main_location.address) &&
          this._renderMainLocations(main_location);
      }

      if (contacts) {
        contactElement =
          !isEmpty(business.contacts) &&
          this._renderContacts(business.contacts[0]);
      }
    }

    if (description.split('').length > maxCharacters) {
      description = truncate(description);
    }

    return (
      <div
        className="business-card busines-card--bg-gray"
        onClick={this.navigateToDetails}
      >
        <div className="business-card-collapse grid">
          <div className="business business-img">
            <img
              className="business-logo"
              src={
                business.logo_url
                  ? business.logo_url
                  : '../static-data/images/orgs-placeholder.png'
              }
            />
          </div>
          <div className="business col-lg-12 col-md-12 col-xs-12 p-0">
            <div className="business-details-container">
              <div className="business-information">
                <h3 className="title text-semi">{business.name}</h3>
                <p className="business-description">{description}</p>
              </div>
              <div className="social-icons-hide">
                {business.facebook && (
                  <a
                    href={business.facebook}
                    target="_blank"
                    className="social-icon"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon className={'icon-svg'} size={18} />
                  </a>
                )}
                {business.twitter && (
                  <a
                    href={business.twitter}
                    target="_blank"
                    className="social-icon"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon className={'icon-svg'} size={18} />
                  </a>
                )}
                {business.linkedin && (
                  <a
                    href={business.linkedin}
                    target="_blank"
                    className="social-icon"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon className={'icon-svg'} size={18} />
                  </a>
                )}
                {business.website && (
                  <a
                    className="website-icon"
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{'Go to Website'}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="grid col-lg-12 col-md-12 col-xs-12 full-information p-0">
            <div className="grid col-lg-12 col-md-12 col-xs-12 p-0 m-bot-25">
              {addressElement}
              {contactElement}
            </div>
            <hr />
            <p className="business-title col-lg-12 col-md-12 col-xs-12 p-0">
              {'Services'}
            </p>
            {business.services.map(service => {
              return (
                <div
                  key={service.id}
                  className="col-lg-12 col-md-12 col-xs-12 grid p-0 business-service m-bot-28"
                >
                  <div
                    className={
                      'service-description ' +
                      (isEmpty(service.contacts)
                        ? 'col-lg-12 col-md-12 col-xs-12 p-left-0'
                        : 'col-lg-7 col-md-7 col-xs-12 p-left-0 p-right-4')
                    }
                  >
                    <h4 className="text-bold">{service.name}</h4>
                    <p>{service.description}</p>
                  </div>
                  {!isEmpty(service.contacts) &&
                    this._renderContacts(service.contacts[0])}
                  {service.categories && (
                    <div className="col-lg-12 col-md-12 col-xs-12 p-0 m-top-16">
                      {service.categories.map(category => {
                        return (
                          <Chip
                            key={category.id}
                            text={category.name}
                            canDelete={false}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            {!isEmpty(other_locations) &&
              isMobile &&
              this._renderOtherLocationsMobile(other_locations)}
            {!isEmpty(other_locations) && !isMobile && (
              <div className="col-lg-12 col-md-12 col-xs-12 grid p-0">
                <div className="col-lg-6 col-md-6 col-xs-6 p-0 m-right-54">
                  <p className="business-title">{'Other Locations'}</p>
                </div>
                <div className="col-lg-4 col-md-4 col-xs-6 p-0">
                  <p className="business-title">{'Contact:'}</p>
                </div>
                {this._renderOtherLocations(other_locations)}
              </div>
            )}
          </div>
          {!isEmpty(main_location) && this._renderLocationInfo(locations)}
        </div>
      </div>
    );
  }
}

Business.propTypes = {
  business: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withRouter(Business);

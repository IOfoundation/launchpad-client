import React, {PureComponent} from 'react';
import {withRouter} from 'react-router';
import Chip from '../shared/Chip';
import FacebookIcon from '../shared/FacebookIcon';
import TwitterIcon from '../shared/TwitterIcon';
import LinkedinIcon from '../shared/LinkedinIcon';
import {PropTypes} from 'prop-types';
import {isEmpty} from 'lodash';

class Business extends PureComponent {
  state = {
    expanded: this.props.expanded,
  };

  toggleCard = () => {
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
            return (
              <div
                key={location.id}
                className="col-lg-12 col-md-12 col-xs-12 m-bot-24 p-0 grid"
              >
                <div className="col-xs-12 p-0 m-right-54">
                  <p className="business-title">{'Other Location:'}</p>
                  <h4>{location.address.address_1}</h4>
                  {location.address.address_2 && (
                    <h4>{location.address.address_2}</h4>
                  )}
                  <h4>{`${location.address.city}, ${location.address
                    .state_province} ${location.address.postal_code}`}</h4>
                </div>
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
          return (
            <div
              key={location.id}
              className="col-lg-12 col-md-12 col-xs-12 m-bot-24 p-0 grid"
            >
              <div className="col-lg-6 col-md-6 col-xs-6 p-0 m-right-54">
                <h4>{location.address.address_1}</h4>
                {location.address.address_2 && (
                  <h4>{location.address.address_2}</h4>
                )}
                <h4>{`${location.address.city}, ${location.address
                  .state_province} ${location.address.postal_code}`}</h4>
              </div>
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
  render() {
    const {business, isSelected, isMobile} = this.props;
    const locations = business.locations;
    const [main_location, ...other_locations] = locations;
    const locationText = locations.length === 1 ? ' Location' : ' Locations';
    const totalLocations = locations.length;
    return (
      <div
        className="business-card"
        style={{backgroundColor: isSelected ? '#E5E5E5' : '#F2F2F2'}}
      >
        <div
          className={
            this.state.expanded
              ? 'business-card-expand grid'
              : 'business-card-collapse grid'
          }
        >
          <div
            className={
              this.state.expanded
                ? 'business col-lg-2 col-md-3 col-xs-12 p-0 m-bot-20'
                : 'business business-img'
            }
            onClick={this.toggleCard}
          >
            <img
              className="business-logo"
              src={
                business.logo_url
                  ? business.logo_url
                  : '../static-data/images/orgs-placeholder.png'
              }
            />
          </div>
          <div
            className={
              this.state.expanded
                ? 'business expanded col-lg-10 col-md-9 col-xs-12 p-right-0'
                : 'business col-lg-12 col-md-12 col-xs-12 p-0'
            }
          >
            <div className="business-details-container">
              <div className="business-information" onClick={this.toggleCard}>
                <h3 className="title m-bot-8">{business.name}</h3>
                <p className="business-description">{business.description}</p>
              </div>
              <div
                className={
                  this.state.expanded
                    ? 'col-lg-12 social-icons p-0 m-top-20'
                    : 'social-icons-hide'
                }
              >
                {business.facebook && (
                  <a
                    href={business.facebook}
                    target="_blank"
                    className="social-icon"
                  >
                    <FacebookIcon className={'icon-svg'} size={18} />
                  </a>
                )}
                {business.twitter && (
                  <a
                    href={business.twitter}
                    target="_blank"
                    className="social-icon"
                  >
                    <TwitterIcon className={'icon-svg'} size={18} />
                  </a>
                )}
                {business.linkedin && (
                  <a
                    href={business.linkedin}
                    target="_blank"
                    className="social-icon"
                  >
                    <LinkedinIcon className={'icon-svg'} size={18} />
                  </a>
                )}
                {business.website && (
                  <a
                    className="website-icon"
                    href={business.website}
                    target="_blank"
                  >
                    <span>{'Go to Website'}</span>
                  </a>
                )}
              </div>
            </div>
            <img
              className="business-card-icon"
              onClick={this.toggleCard}
              style={{float: 'right'}}
              src={
                this.state.expanded
                  ? 'static-data/images/collapse-icon.png'
                  : 'static-data/images/expand-icon.png'
              }
            />
          </div>
          <div className="grid col-lg-12 col-md-12 col-xs-12 full-information p-0">
            <div className="grid col-lg-12 col-md-12 col-xs-12 p-0 m-bot-25">
              <div className="col-lg-4 col-md-4 col-xs-12 p-0 m-right-52 main-location">
                <p className="business-title">{'Main Location:'}</p>
                <h4>{main_location.address.address_1}</h4>
                {main_location.address.address_2 ? (
                  <h4>{main_location.address.address_2}</h4>
                ) : (
                  ''
                )}
                <h4>{`${main_location.address.city}, ${main_location.address
                  .state_province}`}</h4>
              </div>
              {!isEmpty(business.contacts) &&
                this._renderContacts(business.contacts[0])}
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
            {!isEmpty(other_locations) &&
              !isMobile && (
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
          <p className="location text-bold">
            <span>{`${totalLocations} ${locationText}`}</span>
            <span className="m-x-7">{'|'}</span>
            <span>
              {locations.length > 1 && 'Main location in '}
              {main_location.address.city}
              {', '}
              {main_location.address.state_province}
            </span>
          </p>
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
  expanded: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default withRouter(Business);

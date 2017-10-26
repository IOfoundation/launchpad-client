import React, {Component} from 'react';
import Chip from '../shared/Chip';
import {PropTypes} from 'prop-types';

class Business extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.expanded,
    };
  }

  toggleCard() {
    this.setState({expanded: !this.state.expanded});
  }
  render() {
    const {business} = this.props;
    const locations = business.locations;
    return (
      <div className="business-card">
        <div
          className={
            this.state.expanded ? (
              'business-card-expand'
            ) : (
              'business-card-collapse'
            )
          }
        >
          <h3 className="title">
            {business.name}
            <img
              className="business-card-icon"
              onClick={e => this.toggleCard(e)}
              style={{float: 'right'}}
              src={this.state.expanded ? (
                  'static-data/images/collapse-icon.png'
                ) : (
                  'static-data/images/expand-icon.png'
                )
              }
            />
          </h3>
          <p className="preview-details">{business.description}</p>
          <div className="grid col-lg-12 full-information p-0">
            <div className="grid col-lg-8 p-0 m-bot-25">
              <div className="col-lg-12 social-icons">
                <img src="../static-data/images/FB.svg" />
                <img src="../static-data/images/TW.svg" />
                <img src="../static-data/images/Youtube.svg" />
                <img src="../static-data/images/LinkedIN.svg" />
              </div>
              <div className="col-lg-4 p-0 m-right-52 main-location">
                <p className="business-title">{'Main Location:'}</p>
                <h4>{locations[0].address.address_1}</h4>
                <h4>
                  {locations[0].address.city}
                  {','}
                  {locations[0].address.state_province}
                </h4>
              </div>
              <div className="col-lg-4 p-0 main-contact">
                <p className="business-title">{'Contact:'}</p>
                <h4>{business.phones[0].number}</h4>
                <h4>{business.email}</h4>
              </div>
            </div>
            <hr />
            <p className="business-title">{'Services:'}</p>
            {business.services.map(service => {
              return (
                <div
                  key={service.id}
                  className="col-lg-12 grid p-0 business-service m-bot-28"
                >
                  <div className="col-lg-6 p-0">
                    <h4>{service.name}</h4>
                    <p>{service.description}</p>
                  </div>
                  <div className="col-lg-6">
                    {!service.email || service.phones.length <= 0 ? (
                      ''
                    ) : (
                      <p className="business-title">{'contact:'}</p>
                    )}
                    {service.email ? <h4>{service.email}</h4> : null}
                    {service.phones.length <= 0 ? (
                      ''
                    ) : (
                      <h4>{service.phones[0].number}</h4>
                    )}
                  </div>
                  <div className="col-lg-12 p-0 m-top-16">
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
                </div>
              );
            })}
            <hr />
            <div className="col-lg-12 grid p-0">
              <div className="col-lg-4 p-0 m-right-54">
                <p className="business-title">{'Other Locations:'}</p>
                {locations.map(location => {
                  return (
                    <div key={location.id} className="m-top-24">
                      <h4>{location.address.address_1}</h4>
                      {location.address.address_2 && <h4>{location.address.address_2}</h4>}
                      <h4>
                        {location.address.city}
                        {', '}
                        {location.address.state_province}{' '}
                        {location.address.postal_code}
                      </h4>
                    </div>
                  );
                })}
              </div>
              <div className="col-lg-4 p-0">
                <p className="business-title">{'Contact:'}</p>
              </div>
            </div>
          </div>
          <p className="location">
            <span>
              {locations.length}
              {locations.length == 1 ? ' location' : ' locations'}</span>
            <span className="m-x-7">{'|'}</span>
            <span>
              {locations[0].address.city}
              {', '}
              {locations[0].address.state_province}
            </span>
          </p>
        </div>
      </div>
    );
  }
}

Business.propTypes = {
  business: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
};

export default Business;

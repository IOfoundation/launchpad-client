import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class Business extends Component {
  _renderReduced() {
    const {business} = this.props;
    return (
      <div className="row between-xs business_block--expanded">
        <section className="col-xs-9 noPadding">
          <h3 className="business_block--expanded_title">{business.name}</h3>
          <div>
            <div className="business_block--expanded_services">
              <span>{'Service Provides: '}</span>
              {business.Services.map(service => {
                return (
                  <span
                    className="primary service"
                    key={service.id}
                  >{`${service.name}, `}</span>
                );
              })}
            </div>
            <div className="business_block--expanded_services">
              <span>{'Business Stage: '}</span>
              {business.Stages.map(stage => {
                return (
                  <span
                    className="primary stage"
                    key={stage.id}
                  >{`${stage.name}, `}</span>
                );
              })}
            </div>
            <div className="business_block--expanded_services">
              <span>{'Underserved Communities: '}</span>
              {business.Communities.map(community => {
                return (
                  <span
                    className="primary community"
                    key={community.id}
                  >{`${community.name}, `}</span>
                );
              })}
            </div>
          </div>
          <section className="row business_block--expanded_bottom">
            <a className="visitWebsite bold smallFont primary" href="#">
              {'VISIT WEBSITE'}
            </a>
            <a className="socialIcon" href="#">
              <img
                className="socialIcon_icon"
                src="../static-data/images/twitter.svg"
              />
            </a>
            <a className="socialIcon" href="#">
              <img
                className="socialIcon_icon"
                src="../static-data/images/facebook.svg"
              />
            </a>
            <a className="socialIcon" href="#">
              <img
                className="socialIcon_icon"
                src="../static-data/images/linkedin.svg"
              />
            </a>
          </section>
        </section>
        <div className="col-xs-3 business_block_contact">
          <div>
            <p>{business.address}</p>
            <p
            >{`${business.city}, ${business.country_code} ${business.zip_code}`}</p>
            <p>{business.phone}</p>
            <p>{business.email}</p>
          </div>
          <img
            className="business_block_contact_address"
            src={'static-data/images/test-logo.png'}
            alt="businessLogo"
          />
        </div>
      </div>
    );
  }
  _renderExpanded() {
    const {business} = this.props;
    return (
      <div className="row between-xs middle-xs business_block--reduced">
        <div className="col-xs-9 noPadding">
          <h3 className="primary bold bodyFont">{business.name}</h3>
          <div>
            <p className="smallFont opacity50">{business.description}</p>
          </div>
          <section className="row business_block--reduced_bottom">
            <a className="visitWebsite bold smallFont primary" href="#">
              {'VISIT WEBSITE'}
            </a>
            <a className="socialIcon" href="#">
              <img
                className="socialIcon_icon"
                src="static-data/images/twitter.svg"
              />
            </a>
            <a className="socialIcon" href="#">
              <img
                className="socialIcon_icon"
                src="static-data/images/facebook.svg"
              />
            </a>
            <a className="socialIcon" href="#">
              <img
                className="socialIcon_icon"
                src="static-data/images/linkedin.svg"
              />
            </a>
          </section>
        </div>
        <div className="col-xs-3">
          <img src="static-data/images/test-logo.png" alt="businessLogo" />
        </div>
      </div>
    );
  }
  render() {
    const {business, handleClickOnBusiness, expanded} = this.props;
    return (
      <div className="Business" onClick={() => handleClickOnBusiness(business)}>
        {expanded ? this._renderExpanded() : this._renderReduced()}
      </div>
    );
  }
}

Business.propTypes = {
  business: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  handleClickOnBusiness: PropTypes.func.isRequired,
};

export default Business;

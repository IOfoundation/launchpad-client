import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class Business extends Component {
  _renderReduced() {
    const {business} = this.props;
    return (
      <div>
        <h3>{business.name}</h3>
        <section>
          <div>
            <ul>
              <li>
                <span>{'Service Provides: '}</span>
                {business.Services.map(service => {
                  return (
                    <span
                      className="service"
                      key={service.id}
                    >{`${service.name}, `}</span>
                  );
                })}
              </li>
              <li>
                <span>{'Business Stage: '}</span>
                {business.Stages.map(stage => {
                  return (
                    <span
                      className="stage"
                      key={stage.id}
                    >{`${stage.name}, `}</span>
                  );
                })}
              </li>
              <li>
                <span>{'Underserved Communities: '}</span>
                {business.Communities.map(community => {
                  return (
                    <span
                      className="community"
                      key={community.id}
                    >{`${community.name}, `}</span>
                  );
                })}
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>{business.address}</li>
              <li
              >{`${business.city}, ${business.country_code} ${business.zip_code}`}</li>
              <li>{business.phone}</li>
              <li>{business.email}</li>
              <li><img src="{business.logo}" alt="businessLogo" /></li>
            </ul>
          </div>
        </section>
        <section>
          <ul>
            <li><a href="#">{'VISIT WEBSITE'}</a></li>
            <li><a href="#">{'Twitter'}</a></li>
            <li><a href="#">{'Facebook'}</a></li>
            <li><a href="#">{'LinkedIn'}</a></li>
          </ul>
        </section>
      </div>
    );
  }
  _renderExpanded() {
    const {business} = this.props;
    return (
      <div className="row between-xs middle-xs business_block--reduced">
        <div className="col-xs-9">
          <h3 className="primary bold bodyFont">{business.name}</h3>
          <div>
            <p className="smallFont opacity50">{business.description}</p>
          </div>
          <section className="row business_block--reduced_bottom">
            <a className="visitWebsite bold smallFont" href="#">
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
    const {handleClickOnBusiness, expanded} = this.props;
    return (
      <div className="Business" onClick={() => handleClickOnBusiness(business)}>
        {expanded ? this._renderExpanded() : this._renderReduced()}
      </div>
    );
  }
}

Business.propTypes = {
  business: PropTypes.object.isRequired,
  handleClickOnBusiness: PropTypes.func.isRequired,
};

export default Business;

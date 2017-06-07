import React from 'react';
import {PropTypes} from 'prop-types';

const Business = ({business}) => {
  return (
    <div className="">
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
};

Business.propTypes = {
  businesses: PropTypes.object,
};

export default Business;

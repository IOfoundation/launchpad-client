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
              {business.services.map(service => {
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
              <span>{'Growth and Expansion'}</span>
            </li>
            <li>
              <span>{'Underserved Communities: '}</span>
              {business.communities.map(community => {
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
            <li>{'123 Capitol Mall'}</li>
            <li>{'Sacramento, CA 95811'}</li>
            <li>{'(916)424-5848'}</li>
            <li>{'daltic@thegmail.com'}</li>
            <li><img src="" alt="businessLogo" /></li>
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
  business: PropTypes.object,
};

export default Business;

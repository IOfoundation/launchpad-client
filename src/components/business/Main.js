import React from 'react';
import {PropTypes} from 'prop-types';
import {browserHistory} from 'react-router';

import MapView from '../map-view/Main';

const Main = ({business}) => {
  const businesses = [business];
  return (
    <div className="">
      <div>
        <span onClick={browserHistory.goBack}>Back To Resources</span>
      </div>
      <div className="">
        <img src={business.log} alt={`${business.name} logo`} />
        <div>
          <h2>{business.name}</h2>
          <span>CONTACT</span>
          <ul>
            <li>{business.address}</li>
            <li
            >{`${business.city}, ${business.country_code} ${business.zip_code}`}</li>
          </ul>
          <ul>
            <li>{business.phone}</li>
            <li>{business.email}</li>
          </ul>
          <ul>
            <li><a href="#">{'VISIT WEBSITE'}</a></li>
            <li><a href="#">{'Twitter'}</a></li>
            <li><a href="#">{'Facebook'}</a></li>
            <li><a href="#">{'LinkedIn'}</a></li>
          </ul>
        </div>
        <div>
          <h3>SERVICE DESCRIPTION</h3>
          <p>{business.description}</p>
        </div>
        <div>
          <h3>SERVICES OFFERED</h3>
          <ul>
            {business.Services.map(service => (
              <li key={service.id} className={'services'}>{service.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{width: '500px', height: '500px'}}>
        <MapView businesses={businesses} />
      </div>
    </div>
  );
};

Main.propTypes = {
  business: PropTypes.object.isRequired,
};

export default Main;

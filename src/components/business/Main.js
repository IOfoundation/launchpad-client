import React from 'react';
import {PropTypes} from 'prop-types';
import {browserHistory} from 'react-router';

import MapView from '../map-view/Main';
import {MdShare} from 'react-icons/lib/md';

const Main = ({business}) => {
  const businesses = [business];
  return (
    <div className="">
      <div className="row between-xs middle-xs">
        <span onClick={browserHistory.goBack}>{'Back To Resources'}</span>
        <div>
          <span>{'Share'}</span>
          <MdShare size={22} color={'black'} />
        </div>
      </div>
      <div className="">
        <div>
          <img src={business.logo} alt={`${business.name} logo`} />
        </div>
        <div>
          <h2>{business.name}</h2>
          <span>{'CONTACT'}</span>
          <ul>
            <li>{business.address}</li>
            <li
            >{`${business.city}, ${business.country_code} ${business.zip_code}`}</li>
          </ul>
          <ul>
            <li>{business.phone}</li>
            <li>{business.email}</li>
          </ul>
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
        <div>
          <h3>{'SERVICE DESCRIPTION'}</h3>
          <p>{business.description}</p>
        </div>
        <div>
          <h3>{'SERVICES OFFERED'}</h3>
          <ul>
            {business.Services.map(service =>
              <li key={service.id} className={'services'}>{service.name}</li>
            )}
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

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {browserHistory} from 'react-router';

import {MdShare, MdKeyboardBackspace} from 'react-icons/lib/md';
import ContentMap from '../layouts/ContentMap';

class Main extends Component {
  constructor(props) {
    super(props);
    this.reduceMap = this.reduceMap.bind(this);
    this.expandMap = this.expandMap.bind(this);
    this.state = {
      expanded: true,
    };
  }

  reduceMap() {
    this.setState({expanded: false});
  }

  expandMap() {
    this.setState({expanded: true});
  }
  _renderTopBar() {
    return (
      <div className="row between-xs middle-xs businessList_top businessTopBar">
        <div
          onClick={browserHistory.goBack}
          className="businessTopBar_btn middle-xs"
        >
          <MdKeyboardBackspace
            size={22}
            color={'#3F51B5'}
            className="businessTopBar_btn_icon"
          />
          <span>{'Back To Resources'}</span>
        </div>
        <div className="businessTopBar_btn middle-xs">
          <span className="businessTopBar_share">{'SHARE'}</span>
          <MdShare size={22} color={'#3F51B5'} />
        </div>
      </div>
    );
  }
  render() {
    const {business} = this.props;
    const businesses = [business];
    return (
      <ContentMap
        businesses={businesses}
        expanded={this.state.expanded}
        expandMap={this.expandMap}
        reduceMap={this.reduceMap}
        topBar={this._renderTopBar()}
      >
        <div className="bussinessView">
          <div>
            <img src={` ${business.logo}`} alt={`${business.name} logo`} />
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
          </div>
          <div>
            <h3>{'SERVICE DESCRIPTION'}</h3>
            <p>{business.description}</p>
          </div>
          <div>
            <h3>{'SERVICES OFFERED'}</h3>
            <ul>
              {business.Services.map(service => (
                <li key={service.id} className={'services'}>{service.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </ContentMap>
    );
  }
}

Main.propTypes = {
  business: PropTypes.object.isRequired,
};

export default Main;

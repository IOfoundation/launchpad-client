import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {CategoriesConstants} from '../../constants';
import {browserHistory} from 'react-router';

import {MdShare, MdKeyboardBackspace} from 'react-icons/lib/md';
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from 'react-icons/lib/fa';
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
      <div className=" businessList_top businessTopBar">
        <div className="contentContainer row between-xs middle-xs">
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
      </div>
    );
  }
  render() {
    const {business} = this.props;
    const businesses = [business];

    const businessTypeCategory = business.categories.find(
      category => category.name === CategoriesConstants.BUSINESS_TYPE
    );
    const businessTypeCategories = businessTypeCategory
      ? businessTypeCategory.children
      : [];

    return (
      <ContentMap
        businesses={businesses}
        expanded={this.state.expanded}
        expandMap={this.expandMap}
        reduceMap={this.reduceMap}
        topBar={this._renderTopBar()}
      >
        <div className="bussinessView">
          <div className="center-xs bussinessView_logoContainer">
            <img
              className="bussinessView_logo"
              src={` ${business.logo}`}
              alt={`${business.name} logo`}
            />
          </div>
          <div className="bussinessView_contact row between-xs">
            <div className="col-xs-8">
              <h2 className="bussinessView_name">{business.name}</h2>
              <span className="bold smallFont">{'CONTACT'}</span>

              <div className="bussinessView_address">
                <p>{business.address}</p>
                <p
                >{`${business.city}, ${business.country_code} ${business.zip_code}`}</p>
              </div>
              <section className="row business_block--reduced_bottom">
                <a className="visitWebsite bold smallFont white" href="#">
                  {'VISIT WEBSITE'}
                </a>
                <a className="socialIcon" href="#">
                  <FaTwitter
                    className="socialIcon_icon"
                    size={12}
                    color={'white'}
                  />
                </a>
                <a className="socialIcon" href="#">
                  <FaFacebook
                    className="socialIcon_icon"
                    size={12}
                    color={'white'}
                  />
                </a>
                <a className="socialIcon" href="#">
                  <FaLinkedin
                    className="socialIcon_icon"
                    size={12}
                    color={'white'}
                  />
                </a>
              </section>
            </div>
            <div className="col-xs-4 bussinessView_contactInfo">
              <div className="bussinessView_contactInfo_items">
                <p>
                  <FaPhone
                    className="socialIcon_icon"
                    size={10}
                    color={'white'}
                    style={{verticalAlign: 'none'}}
                  />
                  <span>{business.phone}</span>
                </p>
                <p>
                  <FaEnvelope
                    className="socialIcon_icon"
                    size={12}
                    color={'white'}
                    style={{verticalAlign: 'none'}}
                  />
                  <span>{business.email}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="bussinessView_description">
            <h3 className="smallFont">{'SERVICE DESCRIPTION'}</h3>
            <p>{business.description}</p>
            <h3 className="smallFont">{'SERVICES OFFERED'}</h3>
            <ul>
              {businessTypeCategories.map(service => (
                <li key={service.id} className={'services'}>
                  <span className="bussinessView_service_text">
                    {service.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="businessView_related">
            <div className="row between-xs">
              <h3 className="smallFont">{'Related Resources'}</h3>
              <a className="smallFont" href="">
                {'VIEW MORE'}
              </a>
            </div>
            <div className="row between-xs businessView_related_images">
              <div>
                <img src="../static-data/images/test-logo.png" />
                <p className="smallFont">{'1 Million Cups'}</p>
              </div>
              <div>
                <img src="../static-data/images/test-logo.png" />
                <p className="smallFont">{'1 Million Cups'}</p>
              </div>
              <div>
                <img src="../static-data/images/test-logo.png" />
                <p className="smallFont">{'1 Million Cups'}</p>
              </div>
            </div>
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

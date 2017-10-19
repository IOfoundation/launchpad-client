import React, {Component} from 'react';
import {CategoriesConstants} from '../../constants';
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
    const {business: {categories}, handleClickOnBusiness} = this.props;
    const {business} = this.props;
    const mainLocation = business.locations[0];
    if (!categories) {
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
                src="static-data/images/expand-icon.png"
              />
            </h3>
            <p className="preview-details">{business.description}</p>
            <div className="grid col-lg-12 full-information p-0">
              <div className="grid col-lg-8 p-0">
                <div className="col-lg-12 social-icons">
                  <img src="../static-data/images/FB.svg" />
                  <img src="../static-data/images/TW.svg" />
                  <img src="../static-data/images/Youtube.svg" />
                  <img src="../static-data/images/LinkedIN.svg" />
                </div>
                <div className="col-lg-6 p-0">
                  <p className="business-title">{'Main Location:'}</p>
                  <h4>{mainLocation.address.address_1}</h4>
                  <h4>{mainLocation.address.city},
                    {mainLocation.address.state_province}</h4>
                </div>
                <div className="col-lg-6 p-0">
                  <p className="business-title">{'Contact:'}</p>
                  <h4>{business.phones[0].number}</h4>
                  <h4>{business.email}</h4>
                </div>
              </div>
              <hr/>
              {business.services.map(service => {
                return (
                  <div key={service.id} className="col-lg-12 grid p-0">
                    <div className="col-lg-6 p-0">
                      <p className="business-title">{'Services:'}</p>
                      <h4>{service.name}</h4>
                      <p>{service.description}</p>
                    </div>
                    <div className="col-lg-6">
                      {!service.email || service.phones.length <= 0 ? '' : <p className="business-title">{'contact:'}</p>}
                      {service.email ? <h4>{service.email}</h4> : null}
                      {service.phones.length <= 0 ?  '' : <h4>{service.phones[0].number}</h4>}
                    </div>
                  </div>
                );
              })}
              <hr/>
              <div className="col-lg-12">
                <div className="col-lg-6">
                  <p className="business-title">{'Other Locations:'}</p>
                </div>
                <div className="col-lg-6">
                  <p className="business-title">{'Contact:'}</p>
                </div>
              </div>
            </div>
            <p className="location">
              <span>{business.locations.length}
                {business.locations.length == 1 ? ' location | ' : ' locations | '}</span>
              <span>{mainLocation.address.city},
                {mainLocation.address.state_province}</span>
            </p>
          </div>
        </div>
      );
    }
    const businessTypeCategory = business.categories.find(
      category => category.name === CategoriesConstants.BUSINESS_TYPE
    );
    const businessTypeCategories = businessTypeCategory
      ? businessTypeCategory.children
      : [];

    const stageCategory = business.categories.find(
      category => category.name === CategoriesConstants.STAGE
    );
    const stageCategories = stageCategory ? stageCategory.children : [];

    const communityCategory = business.categories.find(
      category => category.name === CategoriesConstants.COMMUNITY
    );
    const communityCategories = communityCategory
      ? communityCategory.children
      : [];

    return (
      <div className="Business" onClick={() => handleClickOnBusiness(business)}>
        <div className="row between-xs business_block--expanded">
          <section className="col-sm-9 col-xs-12 text-xs-margin noPadding">
            <h3 className="business_block--expanded_title">{business.name}</h3>
            <div>
              <div className="business_block--expanded_services">
                <span>{'Service Provides: '}</span>
                {businessTypeCategories.map(service => {
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
                {stageCategories.map(stage => {
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
                {communityCategories.map(community => {
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
          <div className="col-sm-3 col-xs-12 text-xs-margin business_block_contact">
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
      </div>
    );
  }
}

Business.propTypes = {
  business: PropTypes.object.isRequired,
  handleClickOnBusiness: PropTypes.func.isRequired,
  expanded: PropTypes.bool,
};

export default Business;

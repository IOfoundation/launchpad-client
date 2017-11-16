import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import ArrowRight from '../shared/ArrowRight';

class ResultInfo extends Component {
  _onClick(filter) {
    this.props.handleOnChangeFilterOptions(filter.name, 'category', false);
  }

  renderButtonBusinessTypeContainer() {
    return (
      <div className="business-type-container col-lg-12 p-0 grid">
        <div className="col-xs-4 col-md-4 col-lg-4 m-bot-16 p-0">
          <button
            className="btn btn-search btn-outline"
            key={this.props.filterOptions[0].id}
            onClick={e => this._onClick(this.props.filterOptions[0])}
          >
            <div className="btn-search-text text-bold">
              <span className="desktop-devices">{'Startup or High'}</span>
              <span className="desktop-devices">{'Growth Business'}</span>
              <span className="mobile-devices">{'Startup or High Growth Business'}</span>
            </div>
            <ArrowRight
              className="btn-search-icon"
              size={20}
              style={{color: '#000', verticalAlign: 'middle'}}
            />
          </button>
        </div>
        <div className="col-xs-4 col-md-4 col-lg-4 m-bot-16 p-right-0">
          <button
            className="btn btn-search btn-outline"
            key={this.props.filterOptions[1].id}
            onClick={e => this._onClick(this.props.filterOptions[1])}
          >
            <div className="btn-search-text text-bold">
              <span className="desktop-devices">{'Main Street/'}</span>
              <span className="desktop-devices">{'Small Business'}</span>
              <span className="mobile-devices">{'Main Street/Small Business'}</span>
            </div>
            <ArrowRight
              className="btn-search-icon"
              size={20}
              style={{color: '#000', verticalAlign: 'middle'}}
            />
          </button>
        </div>
        <div className="col-xs-4 col-md-4 col-lg-4 m-bot-16 p-right-0">
          <button
            className="btn btn-search btn-outline"
            key={this.props.filterOptions[2].id}
            onClick={e => this._onClick(this.props.filterOptions[2])}
          >
            <div className="btn-search-text text-bold">
              <span className="desktop-devices">{'Microenterprise or'}</span>
              <span className="desktop-devices">{'Home-Based Business'}</span>
              <span className="mobile-devices">{'Microenterprise or Home-Based Business'}</span>
            </div>
            <ArrowRight
              className="btn-search-icon"
              size={20}
              style={{color: '#000', verticalAlign: 'middle'}}
            />
          </button>
        </div>
      </div>
    );
  }

  render() {
    const {businessesMetadata: {totalOrganizations}} = this.props;
    return (
      <div className="grid business-type-btn">
        {this.props.showBusinessTypes && (
          <p className="m-bot-16 col-xs-12 col-md-12 col-lg-12 p-0 business-type-label">
            {'Select a business type that represents you.'}
          </p>
        )}
        {this.props.showBusinessTypes && this.renderButtonBusinessTypeContainer()}
        {totalOrganizations === '0' ?
          '' :
          <div className="col-lg-12 col-md-12 col-xs-12 p-0 desktop-devices">
            <h3 className="m-top-24 col-xs-12 col-md-12 col-lg-12 no-padding">{`${totalOrganizations} Services Available`}</h3>
            <hr className="m-bot-24 m-top-16" />
          </div>
        }
      </div>
    );
  }
}

ResultInfo.propTypes = {
  filterOptions: PropTypes.array.isRequired,
  businessesMetadata: PropTypes.object.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  showBusinessTypes: PropTypes.bool,
};

export default ResultInfo;

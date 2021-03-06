import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Grid from '@material-ui/core/Grid';

import ArrowRight from '../shared/ArrowRight';

class ResultInfo extends Component {
  _onClick(filter) {
    this.props.handleOnChangeFilterOptions('category', filter.name, false);
  }

  displayOrganizationLabel = totalOrganizations => {
    return totalOrganizations === 1
      ? `${totalOrganizations} Resource Available`
      : `${totalOrganizations} Resources Available`;
  };

  renderButtonBusinessTypeContainer() {
    return (
      <Grid container={true} spacing={16}>
        <Grid item={true} xs={12} md={4}>
          <button
            className="btn btn-search btn-outline btn--padding"
            key={this.props.filterOptions[0].id}
            onClick={() => this._onClick(this.props.filterOptions[0])}
          >
            <div className="btn-search-text text-bold">
              <span className="desktop-devices">{'Startup or High'}</span>
              <span className="desktop-devices">{'Growth Business'}</span>
              <span className="mobile-devices">
                {'Startup or High Growth Business'}
              </span>
            </div>
            <ArrowRight
              className="btn-search-icon"
              size={20}
              style={{color: '#000', verticalAlign: 'middle'}}
            />
          </button>
        </Grid>
        <Grid item={true} xs={12} md={4}>
          <button
            className="btn btn-search btn-outline btn--padding"
            key={this.props.filterOptions[1].id}
            onClick={() => this._onClick(this.props.filterOptions[1])}
          >
            <div className="btn-search-text text-bold">
              <span className="desktop-devices">{'Main Street/'}</span>
              <span className="desktop-devices">{'Small Business'}</span>
              <span className="mobile-devices">
                {'Main Street/Small Business'}
              </span>
            </div>
            <ArrowRight
              className="btn-search-icon"
              size={20}
              style={{color: '#000', verticalAlign: 'middle'}}
            />
          </button>
        </Grid>
        <Grid item={true} xs={12} md={4}>
          <button
            className="btn btn-search btn-outline btn--padding"
            key={this.props.filterOptions[2].id}
            onClick={() => this._onClick(this.props.filterOptions[2])}
          >
            <div className="btn-search-text text-bold">
              <span className="desktop-devices">{'Microenterprise or'}</span>
              <span className="desktop-devices">{'Home-Based Business'}</span>
              <span className="mobile-devices">
                {'Microenterprise or Home-Based Business'}
              </span>
            </div>
            <ArrowRight
              className="btn-search-icon"
              size={20}
              style={{color: '#000', verticalAlign: 'middle'}}
            />
          </button>
        </Grid>
      </Grid>
    );
  }

  render() {
    const {metadata, showLoading} = this.props;
    const {totalOrganizations} = metadata;
    return (
      <div className="grid business-type-btn">
        {this.props.showBusinessTypes && (
          <p className="m-bot-16 col-xs-12 col-md-12 col-lg-12 p-0 business-type-label">
            {'Select a business type that represents you.'}
          </p>
        )}
        {this.props.showBusinessTypes &&
          this.renderButtonBusinessTypeContainer()}
        {totalOrganizations && (
          <div className="col-lg-12 col-md-12 col-xs-12 p-0 desktop-devices">
            <h3 className="m-top-24 col-xs-12 col-md-12 col-lg-12 no-padding">
              {showLoading
                ? 'Loading Resources'
                : this.displayOrganizationLabel(totalOrganizations)}
            </h3>
            <hr className="m-bot-24 m-top-16" />
          </div>
        )}
      </div>
    );
  }
}

ResultInfo.propTypes = {
  filterOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  metadata: PropTypes.shape({
    pagination: PropTypes.shape({
      first: PropTypes.object,
      last: PropTypes.object,
      next: PropTypes.object,
      currentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    totalOrganization: PropTypes.string,
  }).isRequired,
  showBusinessTypes: PropTypes.bool,
  showLoading: PropTypes.bool.isRequired,
};

export default ResultInfo;

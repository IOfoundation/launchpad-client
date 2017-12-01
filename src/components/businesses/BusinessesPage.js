import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FilterBox from '../filters/FilterBox';
import FilterBoxMobile from '../filters/FilterBoxMobile';
import BusinessesView from './Main';
import {Link} from 'react-router';

class BusinessesPage extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.businesses !== nextProps.businesses;
  }

  renderFilterBoxMobile() {
    const {
      businesses,
      getTextSearchResults,
      handleClickOnClearAllFilters,
      handleOnChangeFilterOptions,
    } = this.props;
    return (
      <FilterBoxMobile
        businesses={businesses}
        getTextSearchResults={getTextSearchResults}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        handleOnChangeFilterOptions={handleOnChangeFilterOptions}
      />
    );
  }
  renderFilterBoxDesktop() {
    const {
      businesses,
      getTextSearchResults,
      handleClickOnClearAllFilters,
      handleOnChangeFilterOptions,
    } = this.props;
    return (
      <FilterBox
        businesses={businesses}
        getTextSearchResults={getTextSearchResults}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        handleOnChangeFilterOptions={handleOnChangeFilterOptions}
      />
    );
  }

  render() {
    const {
      windowWidth,
      businesses,
      handleOnChangeBusinessType,
      handleOnChangeLocationToggle,
      handleChangePage,
      handleClickOnClearAllFilters,
      handleOnChangeFilterOptions,
    } = this.props;
    const isMobile = windowWidth <= 960;
    return (
      <section>
        <div className="search-nav search-nav-invert">
          <div className="row contentContainer">
            <div>
              <Link className="desktop-devices" to="/">
                <img
                  className="logo"
                  src="static-data/images/ioLogoBlack.png"
                />
              </Link>
            </div>
            <div className="col-lg-9 col-md-9 col-xs-9 body-container">
              <h2 className="desktop-devices">
                {
                  "Where startups and small businesses connect in California's Capital Region"
                }
              </h2>
              {isMobile
                ? this.renderFilterBoxMobile()
                : this.renderFilterBoxDesktop()}
              <BusinessesView
                isMobile={isMobile}
                businesses={businesses}
                handleOnChangeBusinessType={handleOnChangeBusinessType}
                handleOnChangeLocationToggle={handleOnChangeLocationToggle}
                handleChangePage={handleChangePage}
                handleClickOnClearAllFilters={handleClickOnClearAllFilters}
                handleOnChangeFilterOptions={handleOnChangeFilterOptions}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

BusinessesPage.propTypes = {
  businesses: PropTypes.object.isRequired,
  getTextSearchResults: PropTypes.func,
  handleChangePage: PropTypes.func,
  handleClickOnClearAllFilters: PropTypes.func,
  handleOnChangeBusinessType: PropTypes.func,
  handleOnChangeFilterOptions: PropTypes.func,
  handleOnChangeLocationToggle: PropTypes.func,
  handleOnChangeFilterOptions: PropTypes.func,
  windowWidth: PropTypes.number,
};

export default BusinessesPage;

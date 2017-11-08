import React, {Component} from 'react';
import MainLayout from '../layouts/Main';
import FilterBox from '../filters/FilterBox';
import FilterBoxMobile from '../filters/FilterBoxMobile';
import BusinessesView from './Main';
import {Link} from 'react-router';

class BusinessPage extends Component {
  render() {
    return (
      <MainLayout>
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
                    "Where startups and small businesses connect in California's Central Valley"
                  }
                </h2>
                <div className="desktop-devices">
                  <FilterBox
                    getTextSearchResults={this.props.getTextSearchResults}
                    filterOptions={this.props.filterOptions}
                    items={this.props.items}
                    handleClickOnClearAllFilters={this.props.handleClickOnClearAllFilters}
                    handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
                    getFilterChips={this.props.getFilterChips}
                  />
                </div>
                <div className="mobile-devices">
                  <FilterBoxMobile
                    getTextSearchResults={this.props.getTextSearchResults}
                    filterOptions={this.props.filterOptions}
                    items={this.props.items}
                    handleClickOnClearAllFilters={this.props.handleClickOnClearAllFilters}
                    handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
                    getFilterChips={this.props.getFilterChips}
                  />
                </div>
                <BusinessesView
                  displayOptions={this.props.displayOptions}
                  filterOptions={this.props.filterOptions}
                  organizations={this.props.organizations}
                  locations={this.props.locations}
                  businessesMetadata={this.props.businessesMetadata}
                  checkBusinessType={this.props.checkBusinessType}
                  checkLocationToggle={this.props.checkBusinessType}
                  handleChangePage={this.props.handleChangePage}
                  handleClickOnClearAllFilters={this.props.handleClickOnClearAllFilters}
                  handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
                />
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    )
  }
}

export default BusinessPage;

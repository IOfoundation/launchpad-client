import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';
import {isEmpty, isString} from 'lodash';
import BusinessesPage from 'components/businesses/BusinessesPage';
import MainLayout from '../components/layouts/Main';
import * as actions from '../actions/business';

export class Businesses extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }
  componentWillMount(_nextProps) {
    const params = this.props.location.query;
    this.props.actions.fetchFilterOptions();
    const locationToggleSwitch = 'ne_lat' in params ? true : false;
    window.addEventListener('resize', () => this.handleWindowSizeChange());
    this.props.actions.changeFilterDisplayOptions(this.checkBusinessType(params.category), locationToggleSwitch);
    'id' in params ?
      this.props.actions.filterOrganizations(params.id, params, 'organization', true) :
      this.props.actions.filterOrganizations(null, params, 'category');
  }

  componentWillUnMount() {
    window.addEventListener('resize', () => this.handleWindowSizeChange());
  }

  handleWindowSizeChange() {
    this.setState({width: window.innerWidth});
  }

  checkBusinessType(filters) {
    const businessTypes = ['Startup or High-Growth Business', 'Main Street or Small Business', 'Microenterprise or Home Based Business'];
    if(isEmpty(filters)){ return true; }

    if(isString(filters)){
      return !businessTypes.includes(filters);
    }
    const filteredTypes = filters.map(filter => businessTypes.includes(filter));
    return isEmpty(filteredTypes);
  }

  getTextSearchResults(filter) {
    this.props.actions.fetchSearchResults(filter);
  }

  handleOnChangeBusinessType(filterValue) {
    const showBusinessTypes = this.props.displayOptions.showBusinessTypes;
    const businessTypes = this.props.filters.businessTypes.map(filter => filter.name);
    if (filterValue) {
      return businessTypes.includes(filterValue)? !showBusinessTypes: showBusinessTypes;
    }
    return showBusinessTypes;
  }

  handleOnChangeLocationToggle(filterType, removeFilter) {
    const locationToggleSwitch = this.props.displayOptions.locationToggleSwitch;
    switch (filterType) {
      case 'coordinates':
        return !removeFilter ? true : false;
      case 'organization':
        return false;
      default:
        return locationToggleSwitch;
    }
  }

  handleOnChangeFilterOptions(filterValue, filterType, removeFilter) {
    const params = this.props.queries;
    this.props.actions.changeFilterDisplayOptions(
      this.handleOnChangeBusinessType(filterValue),
      this.handleOnChangeLocationToggle(filterType, removeFilter)
    );
    this.getFilterChips(filterValue);
    if (typeof removeFilter === "undefined" && !isEmpty(params.category)) {
      removeFilter = params.category.includes(filterValue) ? true : false;
    }
    this.props.actions.filterOrganizations(filterValue, params, filterType, removeFilter)
  }

  getFilterChips() {
    return this.props.queries;
  }

  handleClickOnClearAllFilters() {
    this.props.actions.filterOrganizations(null, null, 'all', true);
    this.props.actions.changeFilterDisplayOptions(true, false);
  }

  handleChangePage(page) {
    const businessesFilters = this.props.location.query;
    this.props.actions.changePage(page, businessesFilters);
  }

  render() {
    const {displayOptions, filters, organizations, locations, items, metadata} = this.props;
    return (
      <MainLayout>
        <BusinessesPage
          displayOptions={displayOptions}
          filterOptions={filters}
          items={items}
          organizations={organizations}
          locations={locations}
          businessesMetadata={metadata}
          windowWidth={this.state.width}
          getTextSearchResults={(e) => this.getTextSearchResults(e)}
          checkBusinessType={(filterValue) => this.handleOnChangeBusinessType(filterValue)}
          checkLocationToggle={() => this.handleOnChangeLocationToggle()}
          handleClickOnClearAllFilters={(e) =>
            this.handleClickOnClearAllFilters(e)}
          handleOnChangeFilterOptions={(filterValue, filterType, removeFilter) =>
            this.handleOnChangeFilterOptions(filterValue, filterType, removeFilter)}
          getFilterChips={(e) => this.getFilterChips()}
          handleChangePage={(e) => this.handleChangePage(e)}
        />
    </MainLayout>
    );
  }
}

Businesses.propTypes = {
  actions: PropTypes.object,
  displayOptions: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  filters: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object),
  params: PropTypes.object,
};

const mapStateToProps = _state => {
  const {businesses, routing} = _state;
  return {
    displayOptions: businesses.displayOptions,
    items: businesses.items,
    filters: businesses.filters,
    locations: businesses.locations,
    metadata: businesses.metadata,
    organizations: businesses.organizations,
    queries: routing.locationBeforeTransitions.query,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);

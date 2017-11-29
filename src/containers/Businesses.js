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
      showLoading: true,
    };
  }

  componentWillMount(_nextProps) {
    const params = this.props.location.query;
    this.props.actions.fetchFilterOptions();
    const locationToggleSwitch = 'ne_lat' in params;
    window.addEventListener('resize', () => this.handleWindowSizeChange());
    this.props.actions.changeFilterDisplayOptions(
      this.checkBusinessType(params.category),
      locationToggleSwitch
    );
    'id' in params
      ? this.handleInitialOrgSearch(params)
      : this.handleInitialCategorySearch(params);
  }

  componentWillReceiveProps(newProps) {
    const params = newProps.queries;
    const locationToggleSwitch = 'ne_lat' in params;
    if (
      newProps.location.search.localeCompare(this.props.location.search) !== 0
    ) {
      this.setState({showLoading: true});
      'id' in params
        ? this.handleInitialOrgSearch(params)
        : this.handleInitialCategorySearch(params);
    }
    if (newProps.organizations !== this.props.organizations) {
      this.setState({showLoading: false});
    }
  }

  componentWillUnMount() {
    window.addEventListener('resize', () => this.handleWindowSizeChange());
  }
  handleWindowSizeChange() {
    this.setState({width: window.innerWidth});
  }

  handleInitialOrgSearch(params) {
    this.props.actions.filterOrganizations(
      'organization',
      params,
      params.id,
      true
    );
  }

  handleInitialCategorySearch(params) {
    this.props.actions.updateChipFilers('category', params);
    this.props.actions.filterOrganizations('category', params);
  }

  checkBusinessType(filters) {
    const businessTypes = [
      'Startup or High-Growth Business',
      'Main Street or Small Business',
      'Microenterprise or Home Based Business',
    ];
    if (isEmpty(filters)) {
      return true;
    }
    if (isString(filters)) {
      return !businessTypes.includes(filters);
    }
    const filteredTypes = filters.map(filter => businessTypes.includes(filter));
    return isEmpty(filteredTypes);
  }

  getTextSearchResults = filter => {
    this.props.actions.fetchSearchResults(filter);
  };

  handleOnChangeBusinessType = filterValue => {
    const showBusinessTypes = this.props.displayOptions.showBusinessTypes;
    const businessTypes = this.props.filters.businessTypes.map(
      filter => filter.name
    );
    if (filterValue) {
      return businessTypes.includes(filterValue)
        ? !showBusinessTypes
        : showBusinessTypes;
    }
    return showBusinessTypes;
  };

  handleOnChangeLocationToggle = (filterType, removeFilter) => {
    const locationToggleSwitch = this.props.displayOptions.locationToggleSwitch;
    switch (filterType) {
      case 'coordinates':
        return !removeFilter;
      case 'organization':
        return false;
      default:
        return locationToggleSwitch;
    }
  };

  handleOnChangeFilterOptions = (filterType, filterValue, removeFilter) => {
    const {queries} = this.props;
    const {
      changeFilterDisplayOptions,
      updateChipFilers,
      filterOrganizations,
    } = this.props.actions;
    this.setState({showLoading: true});
    changeFilterDisplayOptions(
      this.handleOnChangeBusinessType(filterValue),
      this.handleOnChangeLocationToggle(filterType, removeFilter)
    );
    if (typeof removeFilter === 'undefined' && !isEmpty(queries.category)) {
      removeFilter = Boolean(queries.category.includes(filterValue));
    }
    updateChipFilers(filterType, queries, filterValue, removeFilter);
    filterOrganizations(filterType, queries, filterValue, removeFilter);
  };

  handleClickOnClearAllFilters = () => {
    this.setState({showLoading: true});
    this.props.actions.updateChipFilers();
    this.props.actions.filterOrganizations();
    this.props.actions.changeFilterDisplayOptions(true, false);
  };

  handleChangePage = page => {
    const businessesFilters = this.props.location.query;
    this.props.actions.changePage(page, businessesFilters);
  };

  render() {
    const {
      displayOptions,
      filters,
      organizations,
      locations,
      items,
      metadata,
      appliedFilters,
      queries,
    } = this.props;
    const filterById = 'id' in queries && true;
    return (
      <MainLayout>
        <BusinessesPage
          appliedFilters={appliedFilters}
          displayOptions={displayOptions}
          filterOptions={filters}
          items={items}
          filterById={filterById}
          organizations={organizations}
          locations={locations}
          businessesMetadata={metadata}
          showLoading={this.state.showLoading}
          windowWidth={this.state.width}
          getTextSearchResults={this.getTextSearchResults}
          checkBusinessType={this.handleOnChangeBusinessType}
          checkLocationToggle={this.handleOnChangeLocationToggle}
          handleClickOnClearAllFilters={this.handleClickOnClearAllFilters}
          handleOnChangeFilterOptions={this.handleOnChangeFilterOptions}
          handleChangePage={this.handleChangePage}
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
    appliedFilters: businesses.appliedFilters,
    displayOptions: businesses.displayOptions,
    items: businesses.items,
    filters: businesses.filters,
    locations: businesses.locations,
    metadata: businesses.metadata,
    organizations: businesses.organizations,
    queries: routing.locationBeforeTransitions.query,
    action: routing.locationBeforeTransitions.action,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);

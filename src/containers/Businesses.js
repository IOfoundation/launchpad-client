import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';
import {isEmpty, isString} from 'lodash';
import BusinessesPage from 'components/businesses/BusinessesPage';
import MainLayout from '../components/layouts/Main';
import * as actions from '../actions/business';

export class Businesses extends PureComponent {
  state = {
    width: window.innerWidth,
    showLoading: true,
    homePage: false,
    businessPageLoaded: false,
  };

  componentWillMount(_nextProps) {
    const {params} = this.props;
    this.props.actions.fetchFilterOptions();
    const locationToggleSwitch = 'ne_lat' in params;
    window.addEventListener('resize', () => this.handleWindowSizeChange());
    this.props.actions.changeFilterDisplayOptions(
      this.checkBusinessType(params.category),
      locationToggleSwitch
    );
    if ('id' in params) {
      this.handleInitialOrgSearch(params);
    } else {
      this.handleInitialCategorySearch(params);
    }
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
  }

  componentWillReceiveProps(newProps) {
    const {organizations} = this.props.businesses;
    if (newProps.businesses.organizations !== organizations) {
      this.setState({showLoading: false, businessPageLoaded: true});
    }
  }

  componentWillUnMount() {
    window.addEventListener('resize', () => this.handleWindowSizeChange());
  }

  onBackButtonEvent = () => {
    const {params} = this.props;
    const locationToggleSwitch = 'ne_lat' in params;
    const {
      filterOrganizations,
      updateChipFilters,
      changeFilterDisplayOptions,
    } = this.props.actions;
    this.setState({showLoading: true});
    filterOrganizations('back-button', params);
    updateChipFilters('back-button', params);
    changeFilterDisplayOptions(
      this.checkBusinessType(params.category),
      locationToggleSwitch
    );
  };

  handleWindowSizeChange = () => {
    this.setState({width: window.innerWidth});
  };

  handleInitialOrgSearch = params => {
    this.props.actions.updateChipFilters(
      'organization',
      params,
      params.id,
      true
    );
    this.props.actions.filterOrganizations(
      'organization',
      params,
      params.id,
      true
    );
  };

  handleInitialCategorySearch = params => {
    this.props.actions.updateChipFilters('category', params);
    this.props.actions.filterOrganizations('category', params);
  };

  checkBusinessType = filters => {
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
    const filteredTypes = filters.map(filter => {
      if (businessTypes.includes(filter) === true) {
        return true;
      }
      return false;
    });
    return !filteredTypes.includes(true);
  };

  getTextSearchResults = filter => {
    this.props.actions.fetchSearchResults(filter);
  };

  handleOnChangeBusinessType(filterValue) {
    const {displayOptions, filters} = this.props.businesses;
    const showBusinessTypes = displayOptions.showBusinessTypes;
    const businessTypes = filters.businessTypes.map(filter => filter.name);
    if (filterValue) {
      return businessTypes.includes(filterValue)
        ? !showBusinessTypes
        : showBusinessTypes;
    }
    return showBusinessTypes;
  }

  handleOnChangeLocationToggle(filterType, removeFilter) {
    const locationToggleSwitch = this.props.businesses.displayOptions
      .locationToggleSwitch;
    switch (filterType) {
      case 'coordinates':
        return !removeFilter;
      case 'organization':
        return false;
      default:
        return locationToggleSwitch;
    }
  }

  handleOnChangeFilterOptions = (filterType, filterValue, removeFilter) => {
    const {params} = this.props;
    const {
      changeFilterDisplayOptions,
      updateChipFilters,
      filterOrganizations,
    } = this.props.actions;
    this.setState({showLoading: true});
    let showBusinessTypes = this.handleOnChangeBusinessType(filterValue);
    if (filterType === 'organization') {
      showBusinessTypes = true;
    }
    changeFilterDisplayOptions(
      showBusinessTypes,
      this.handleOnChangeLocationToggle(filterType, removeFilter)
    );
    if (typeof removeFilter === 'undefined' && !isEmpty(params.category)) {
      updateChipFilters(
        filterType,
        params,
        filterValue,
        Boolean(params.category.includes(filterValue))
      );
      filterOrganizations(
        filterType,
        params,
        filterValue,
        Boolean(params.category.includes(filterValue))
      );
    }
    updateChipFilters(filterType, params, filterValue, removeFilter);
    filterOrganizations(filterType, params, filterValue, removeFilter);
  };

  handleClickOnClearAllFilters = () => {
    const {params} = this.props;
    const {
      updateChipFilters,
      filterOrganizations,
      changeFilterDisplayOptions,
    } = this.props.actions;
    this.setState({showLoading: true});
    updateChipFilters('all', params);
    filterOrganizations('all', params);
    changeFilterDisplayOptions(true, false);
  };

  handleChangePage = page => {
    const {params} = this.props;
    this.setState({showLoading: true});
    this.props.actions.updateAppliedFiltersCurrentPage(page, params);
    this.props.actions.changePage(page, params);
  };

  render() {
    const {businesses, params} = this.props;
    const {width, showLoading, businessPageLoaded} = this.state;
    const filterById = 'id' in params && true;
    return (
      <MainLayout windowWidth={width} homePage={this.state.homePage}>
        <BusinessesPage
          businesses={businesses}
          businessPageLoaded={businessPageLoaded}
          windowWidth={width}
          showLoading={showLoading}
          filterById={filterById}
          getTextSearchResults={this.getTextSearchResults}
          handleOnChangeBusinessType={this.handleOnChangeBusinessType}
          handleOnChangeLocationToggle={this.handleOnChangeLocationToggle}
          handleClickOnClearAllFilters={this.handleClickOnClearAllFilters}
          handleOnChangeFilterOptions={this.handleOnChangeFilterOptions}
          handleChangePage={this.handleChangePage}
        />
      </MainLayout>
    );
  }
}

Businesses.propTypes = {
  actions: PropTypes.shape({
    updateChipFilters: PropTypes.func.isRequired,
    filterOrganizations: PropTypes.func.isRequired,
    changeFilterDisplayOptions: PropTypes.func.isRequired,
    updateAppliedFiltersCurrentPage: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
    fetchFilterOptions: PropTypes.func.isRequired,
    fetchSearchResults: PropTypes.func.isRequired,
  }),
  businesses: PropTypes.shape({
    organizations: PropTypes.arrayOf(PropTypes.object),
    filters: PropTypes.shape({}),
    displayOptions: PropTypes.shape({
      locationToggleSwitch: PropTypes.bool.isRequired,
    }),
  }),
  params: PropTypes.shape({}),
};

const mapStateToProps = _state => {
  const {businesses, routing} = _state;
  return {
    businesses,
    params: routing.locationBeforeTransitions.query,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);

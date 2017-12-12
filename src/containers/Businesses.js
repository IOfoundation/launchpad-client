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
    'id' in params
      ? this.handleInitialOrgSearch(params)
      : this.handleInitialCategorySearch(params);
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
  }

  componentWillReceiveProps(newProps) {
    const {organizations} = this.props.businesses;
    if (newProps.businesses.organizations !== organizations) {
      this.setState({showLoading: false});
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
    changeFilterDisplayOptions(
      this.handleOnChangeBusinessType(filterValue),
      this.handleOnChangeLocationToggle(filterType, removeFilter)
    );
    if (typeof removeFilter === 'undefined' && !isEmpty(params.category)) {
      removeFilter = Boolean(params.category.includes(filterValue));
    }
    updateChipFilters(filterType, params, filterValue, removeFilter);
    filterOrganizations(filterType, params, filterValue, removeFilter);
  };

  handleClickOnClearAllFilters = () => {
    const {
      updateChipFilters,
      filterOrganizations,
      changeFilterDisplayOptions,
    } = this.props.actions;
    this.setState({showLoading: true});
    updateChipFilters('all');
    filterOrganizations('all');
    changeFilterDisplayOptions(true, false);
  };

  handleChangePage = page => {
    const {params} = this.props;
    this.props.actions.changePage(page, params);
    this.getLocationsInView(this.props.businesses.locations);
  };

  reduceMap = () => {
    this.props.actions.changeMapSize(false, this.props.businesses.mapProps);
  };

  expandMap = () => {
    this.props.actions.changeMapSize(true, this.props.businesses.mapProps);
  };

  getLocationsInView = locations => {
    let count = 0;
    if (locations !== null) {
      locations.forEach(location => {
        const [lat, lng] = [location.latitude, location.longitude];
        if (this.isWithinBounds(lng, lat) === true) {
          count++;
        }
      });
      this.setLocationsInView(count);
    }
  };

  setLocationsInView = count => {
    this.props.actions.updateLocationsInView(
      count,
      this.props.businesses.mapProps
    );
  };

  setCenterCoordinates = coordinates => {
    this.props.actions.updateCenterCoordinates(
      coordinates,
      this.props.businesses.mapProps
    );
  };

  setMapInstance = ({map, maps}) => {
    this.props.actions.updateMapInstance(
      {map, maps},
      this.props.businesses.mapProps
    );
  };

  isWithinBounds = (lng, lat) => {
    const {mapProps: {mapMarginBounds}} = this.props.businesses;
    if (!isEmpty(mapMarginBounds)) {
      const nw = mapMarginBounds.nw;
      const se = mapMarginBounds.se;
      if (lat > se.lat && lat < nw.lat && lng > nw.lng && lng < se.lng) {
        return true;
      }
    }
  };

  onBoundsChange = mapDetails => {
    const {businesses} = this.props;
    this.props.actions.updateMapBounds(
      mapDetails,
      this.props.businesses.mapProps
    );
    if (businesses.displayOptions.locationToggleSwitch) {
      this.handleOnChangeFilterOptions('coordinates', mapDetails.bounds, false);
    }
  };

  render() {
    const {businesses, params} = this.props;
    const {width, showLoading} = this.state;
    const mapActions = {
      reduceMap: this.reduceMap,
      expandMap: this.expandMap,
      getLocationsInView: this.getLocationsInView,
      setLocationsInView: this.setLocationsInView,
      setMapMarginBounds: this.setMapMarginBounds,
      setCenterCoordinates: this.setCenterCoordinates,
      setMapInstance: this.setMapInstance,
      isWithinBounds: this.isWithinBounds,
      onBoundsChange: this.onBoundsChange,
    };
    const filterById = 'id' in params && true;
    return (
      <MainLayout windowWidth={width}>
        <BusinessesPage
          businesses={businesses}
          windowWidth={width}
          showLoading={showLoading}
          filterById={filterById}
          getTextSearchResults={this.getTextSearchResults}
          handleOnChangeBusinessType={this.handleOnChangeBusinessType}
          handleOnChangeLocationToggle={this.handleOnChangeLocationToggle}
          handleClickOnClearAllFilters={this.handleClickOnClearAllFilters}
          handleOnChangeFilterOptions={this.handleOnChangeFilterOptions}
          handleChangePage={this.handleChangePage}
          mapActions={mapActions}
        />
      </MainLayout>
    );
  }
}

Businesses.propTypes = {
  actions: PropTypes.object,
  businesses: PropTypes.object,
  params: PropTypes.object,
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

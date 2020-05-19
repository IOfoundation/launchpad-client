import React, {PureComponent} from 'react';
import Layout from './Layout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import LocationFormContainer from '../../components/admin-site/elements/LocationFormContainer';
import Loading from '@Shared/Loading';

import * as _locationsActions from '@Actions/locations';
import * as getByOrganizationActions from '@Actions/locations/getByOrganization';
import {getAuthorization} from '@Utils';

class LocationFormRoute extends PureComponent {
  componentDidMount() {
    const {
      routeParams,
      locationsActions,
      Authorization,
      organizationId,
      getByOrganization,
    } = this.props;

    if (routeParams.id === 'new') {
      locationsActions.setLoading(false);
    } else {
      locationsActions.getLocatonById(routeParams.id);
      getByOrganization.getLocationByOrganization({
        organizationId,
        Authorization,
      });
    }
  }

  render() {
    const {location, loading, breakpoint, primaryLocation} = this.props;
    let locationElement = <Loading />;

    if (Object.keys(location).length > 0 || !loading) {
      locationElement = (
        <LocationFormContainer
          breakpoint={breakpoint}
          data={location}
          loadingFinished={!loading}
          primaryLocation={primaryLocation}
        />
      );
    }

    return <Layout>{locationElement}</Layout>;
  }
}

const mapStateToProps = _state => {
  const Authorization = getAuthorization(_state);
  const organizationId =
    _state.user.organizationId || sessionStorage.getItem('organizationId');
  const primaryLocation = _state.getLocationByOrganization.locations.find(
    location => location.is_primary
  );

  return {
    error: _state.user.error,
    location: _state.locations.location,
    locationByIdSuccess: _state.locations.locationByIdSuccess,
    loading: _state.locations.loading,
    Authorization,
    organizationId,
    primaryLocation,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    locationsActions: bindActionCreators(_locationsActions, _dispatch),
    getByOrganization: bindActionCreators(getByOrganizationActions, _dispatch),
  };
};

LocationFormRoute.propTypes = {
  Authorization: PropTypes.string,
  breakpoint: PropTypes.string,
  error: PropTypes.bool,
  getByOrganization: PropTypes.shape({
    getLocationByOrganization: PropTypes.func,
  }),
  loading: PropTypes.bool,
  location: PropTypes.shape({}),
  locationByIdSuccess: PropTypes.bool,
  locationsActions: PropTypes.shape({
    getLocatonById: PropTypes.func,
    setLoading: PropTypes.func,
  }),
  organizationId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  primaryLocation: PropTypes.shape({}),
  routeParams: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationFormRoute);

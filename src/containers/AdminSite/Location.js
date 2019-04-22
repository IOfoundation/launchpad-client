import React, {PureComponent} from 'react';
import Layout from './Layout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import LocationFormContainer from '../../components/admin-site/elements/LocationFormContainer';
import Loading from '@Shared/Loading';

import * as locationsActions from '@Actions/locations';

class LocationFormRoute extends PureComponent {
  componentDidMount() {
    const {routeParams} = this.props;

    if (routeParams.id === 'new') {
      this.props.locationsActions.setLoading(false);
    } else {
      this.props.locationsActions.getLocatonById(routeParams.id);
    }
  }

  render() {
    const {location, loading, breakpoint} = this.props;
    let locationElement = <Loading />;

    if (Object.keys(location).length > 0 || !loading) {
      locationElement = (
        <LocationFormContainer
          data={location}
          loadingFinished={!loading}
          breakpoint={breakpoint}
        />
      );
    }

    return <Layout>{locationElement}</Layout>;
  }
}

const mapStateToProps = _state => {
  return {
    error: _state.user.error,
    isAuth: _state.user.authorization !== '',
    location: _state.locations.location,
    locationByIdSuccess: _state.locations.locationByIdSuccess,
    loading: _state.locations.loading,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    locationsActions: bindActionCreators(locationsActions, _dispatch),
  };
};

LocationFormRoute.propTypes = {
  breakpoint: PropTypes.string,
  error: PropTypes.bool,
  isAuth: PropTypes.bool,
  loading: PropTypes.bool,
  location: PropTypes.shape({}),
  locationByIdSuccess: PropTypes.bool,
  locationsActions: PropTypes.shape({
    getLocatonById: PropTypes.func,
    setLoading: PropTypes.func,
  }),
  routeParams: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationFormRoute);

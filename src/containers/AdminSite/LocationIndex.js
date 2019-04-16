import React, {PureComponent} from 'react';
import Layout from '../Layout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import Locations from '../../components/admin-site/elements/Locations';
import Loading from '@Shared/Loading';

//import * as locationsActions from '@Actions/locations';
import * as locationsActions from '@Actions/locations/getByOrganization';

class LocationsRoute extends PureComponent {
  componentDidMount() {
    const {organizationId, Authorization} = this.props;

    this.props.locationsActions.getLocationByOrganization({
      organizationId,
      Authorization,
    });
  }

  render() {
    const {locations, loading} = this.props;
    let locationsElement = <Loading />;

    if (locations.length > 0 || !loading) {
      locationsElement = <Locations locations={locations} />;
    }

    return <Layout>{locationsElement}</Layout>;
  }
}

const mapStateToProps = _state => {
  const organizationId =
    _state.user.organizationId || sessionStorage.getItem('organizationId');
  const auth = _state.user.authorization || sessionStorage.getItem('userAuth');

  return {
    error: _state.user.error,
    isAuth: _state.user.authorization !== '',
    Authorization: auth,
    locations: _state.getLocationByOrganization.locations,
    noResults: _state.getLocationByOrganization.locations.length === 0,
    loading: _state.getLocationByOrganization.loading,
    organizationId,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    locationsActions: bindActionCreators(locationsActions, _dispatch),
  };
};

LocationsRoute.propTypes = {
  Authorization: PropTypes.string,
  error: PropTypes.bool,
  isAuth: PropTypes.bool,
  loading: PropTypes.bool,
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  locationsActions: PropTypes.shape({
    getLocationByOrganization: PropTypes.func,
    setLoading: PropTypes.func,
  }),
  noResults: PropTypes.bool,
  organizationId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationsRoute);

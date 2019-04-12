import React, {PureComponent} from 'react';
import Layout from '../Layout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import Locations from '../../components/admin-site/elements/Locations';
import Loading from '@Shared/Loading';

import * as locationsActions from '@Actions/locations';

class LocationsRoute extends PureComponent {
  componentDidMount() {
    this.props.locationsActions.getAllLocations();
  }

  render() {
    const {locations} = this.props;
    let locationsElement = <Loading />;

    if (locations.length > 0) {
      locationsElement = <Locations locations={locations} />;
    }

    return <Layout>{locationsElement}</Layout>;
  }
}

const mapStateToProps = _state => {
  return {
    error: _state.user.error,
    isAuth: _state.user.authorization !== '',
    locations: _state.locations.locations,
    noResults: _state.locations.locations.length === 0,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    locationsActions: bindActionCreators(locationsActions, _dispatch),
  };
};

LocationsRoute.propTypes = {
  error: PropTypes.bool,
  isAuth: PropTypes.bool,
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  locationsActions: PropTypes.shape({
    getAllLocations: PropTypes.func,
    setLoading: PropTypes.func,
  }),
  noResults: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationsRoute);

import React, {PureComponent} from 'react';
import Layout from '../Layout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import LocationFormContainer from '../../components/admin-site/elements/LocationFormContainer';
import Loading from '@Shared/Loading';

import * as locationsActions from '@Actions/locations';

class LocationFormRoute extends PureComponent {
  componentDidMount() {
    this.props.locationsActions.getLocatonById(this.props.routeParams.id);
  }

  render() {
    const {location} = this.props;
    let locationElement = <Loading />;

    if (Object.keys(location).length > 0) {
      locationElement = <LocationFormContainer data={location} />;
    }

    return <Layout>{locationElement}</Layout>;
  }
}

const mapStateToProps = _state => {
  return {
    error: _state.user.error,
    isAuth: _state.user.authorization !== '',
    location: _state.locations.location,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    locationsActions: bindActionCreators(locationsActions, _dispatch),
  };
};

LocationFormRoute.propTypes = {
  error: PropTypes.bool,
  isAuth: PropTypes.bool,
  location: PropTypes.shape({}),
  locationsActions: PropTypes.shape({
    getLocatonById: PropTypes.func,
  }),
  routeParams: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationFormRoute);

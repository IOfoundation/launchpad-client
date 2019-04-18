import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Layout from './Layout';
import ServiceFormContainer from '../../components/admin-site/elements/ServiceFormContainer';
import Loading from '@Shared/Loading';

import * as user from '@Actions/user';
import * as snackbarActions from '@Actions/snackbar';
import * as serviceCreateActions from '@Actions/services/create';
import * as serviceTaxonomy from '@Actions/services/taxonomy';

class ServiceRoute extends PureComponent {
  componentDidMount() {
    this.props.serviceTaxonomyActions.getTaxonomy();
  }

  render() {
    const {router, checkboxes} = this.props;
    let serviceContainer = <Loading />;

    if (checkboxes.length > 0) {
      serviceContainer = <ServiceFormContainer {...this.props} />;
    }

    return <Layout router={router}>{serviceContainer}</Layout>;
  }
}

const mapStateToProps = _state => {
  const organizationId =
    _state.user.organizationId || sessionStorage.getItem('organizationId');
  const locationName =
    _state.user.locationName || sessionStorage.getItem('locationName');
  const Authorization =
    _state.user.authorization || sessionStorage.getItem('userAuth');
  const locationId =
    _state.user.locationId || sessionStorage.getItem('locationId');

  return {
    Authorization,
    error: _state.user.error,
    isAuth: _state.user.authorization !== '',
    locationId,
    locationName,
    organizationId,
    seriveCreateErrors: _state.serviceCreate.errors,
    serviceCreateError: _state.serviceCreate.error,
    serviceUpdated: _state.serviceCreate.service,
    success: _state.serviceCreate.success,
    initialTaxonomy: _state.serviceTaxonomy.initialForm,
    checkboxes: _state.serviceTaxonomy.checkboxes,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    userActions: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
    serviceCreate: bindActionCreators(serviceCreateActions, _dispatch),
    serviceTaxonomyActions: bindActionCreators(serviceTaxonomy, _dispatch),
  };
};

ServiceRoute.propTypes = {
  Authorization: PropTypes.string,
  checkboxes: PropTypes.arrayOf(PropTypes.shape({})),
  error: PropTypes.bool,
  initialTaxonomy: PropTypes.shape({}),
  isAuth: PropTypes.bool,
  locationId: PropTypes.string,
  locationName: PropTypes.string,
  organizationId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  seriveCreateErrors: PropTypes.arrayOf(PropTypes.shape({})),
  serviceCreate: PropTypes.shape({
    create: PropTypes.func,
  }),
  serviceCreateError: PropTypes.bool,
  serviceTaxonomyActions: PropTypes.shape({
    getTaxonomy: PropTypes.func,
  }),
  serviceUpdated: PropTypes.shape({}),
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  success: PropTypes.bool,
  userActions: PropTypes.shape({
    login: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceRoute);

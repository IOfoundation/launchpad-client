import React, {Fragment, PureComponent} from 'react';
import {Link} from 'react-router';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as snackbarActions from '@Actions/snackbar';
import * as profileActions from '@Actions/admin-profile';
import * as yupActions from '@Actions/validate-yup';
import Modal from './Modal';

import {ProfileSchema} from './elements/ProfileFormContainer';
import {falsyToString, getAuthorization} from '@Utils';

class Navigation extends PureComponent {
  state = {
    openModal: false,
    statusPicked: false,
  };

  componentDidUpdate(prevProps) {
    const {errors, snackbar, success, organization} = this.props;

    if (errors.length !== prevProps.errors.length) {
      const title = errors[0].title;
      if (title) {
        snackbar.showSnackbar({
          message: title,
        });
      }
    }

    if (success !== prevProps.success) {
      if (success) {
        snackbar.showSnackbar({
          message: organization.is_published
            ? 'Organization unpublished successfully'
            : 'Organization published successfully',
        });
      }
    }
  }

  updatePublishStatus = () => {
    const {profile, organizationId, auth, schemaValidated} = this.props;
    const {statusPicked} = this.state;

    if (schemaValidated) {
      profile.updatePublishStatus({
        publishStatus: statusPicked,
        organizationId,
        auth,
      });
    }
    this.handlerModalVisibility();
  };

  openModal = status => {
    this.setState({statusPicked: status});
    let validate;

    if (Object.keys(this.props.updatedOrganization).length > 0) {
      validate = this._mapToValidate(this.props.updatedOrganization);
    } else {
      validate = this._mapToValidate(this.props.organization);
    }

    this.props.yupActions.validateSchema(ProfileSchema, validate);
    this.handlerModalVisibility();
  };

  _mapToValidate(organization) {
    const clean = Object.keys(organization).reduce((acc, key) => {
      acc[key] = falsyToString(organization[key]);
      return acc;
    }, {});
    return {
      id: clean.id,
      contactEmail: clean.email,
      organizationName: clean.alternate_name,
      name: clean.name,
      website: clean.website,
      description: clean.description,
      dateIncorporation: clean.date_incorporated,
      legalStatus: '',
      taxIdentifier: '',
      taxStatus: '',
      twitter: clean.twitter,
      facebook: clean.facebook,
      linkedin: clean.linkedin,
    };
  }

  handlerModalVisibility = () => {
    this.setState(prevState => {
      return {
        openModal: !prevState.openModal,
      };
    });
  };
  _statusPicked;

  render() {
    const {
      classes,
      displayName,
      location,
      organization,
      schemaFail,
      schemaValidated,
      updatedOrganization,
    } = this.props;
    const {statusPicked} = this.state;
    const navigationClasses = [classes.navigation];
    const name = displayName || updatedOrganization.name || organization.name;
    let status = null;

    if (location.pathname === '/admin/profile') {
      navigationClasses.push(classes.addBorder);
      let button = null;
      let description = null;

      if (organization.is_published) {
        button = (
          <button
            className="btn btn__red"
            onClick={() => this.openModal(false)}
          >
            {'Unpublish'}
          </button>
        );
        description = 'Published';
      } else {
        button = (
          <button
            className="btn btn__green"
            onClick={() => this.openModal(true)}
          >
            {'Publish'}
          </button>
        );
        description = 'Not Published';
      }

      status = (
        <Fragment>
          <h3 className={`${classes.title} m-top-16`}>{'Status'}</h3>
          <p className={classes.description}>{description}</p>
          {button}
        </Fragment>
      );
    }

    return (
      <div className={classes.container}>
        <Modal
          open={this.state.openModal}
          modalClosed={this.handlerModalVisibility}
          cancelClicked={this.handlerModalVisibility}
          statusPicked={statusPicked}
          activeClicked={this.updatePublishStatus}
          schemaFail={schemaFail}
          schemaValidated={schemaValidated}
        />
        <h3 className={classes.title}>{'Your organization'}</h3>
        <p className={classes.description}>{name}</p>
        <ul className={navigationClasses.join(' ')}>
          <li>
            <Link
              activeStyle={activeStyles}
              className={classes.link}
              to="/admin/profile"
            >
              {'Profile'}
            </Link>
          </li>
          <li>
            <Link
              activeStyle={activeStyles}
              className={classes.link}
              to="/admin/location"
            >
              {'Locations'}
            </Link>
          </li>
          {/*<li>
            <Link
              activeStyle={activeStyles}
              className={classes.link}
              to="/admin/services"
            >
              {'Services'}
            </Link>
        </li>*/}
          <li>
            <Link
              activeStyle={activeStyles}
              className={classes.link}
              to="/admin/blog"
            >
              {'Blog Posts'}
            </Link>
          </li>
          <li>
            <Link
              activeStyle={activeStyles}
              className={classes.link}
              to="/admin/events"
            >
              {'Events'}
            </Link>
          </li>
        </ul>
        {status}
      </div>
    );
  }
}

const activeStyles = {
  color: '#00ba81',
  opacity: 1,
  fontFamily: '"proxima-nova-bold", Georgia, sans-serif',
};

const styles = theme => {
  return {
    container: {
      background: 'black',
      margin: '68px 0 24px',
      padding: '24px',
      [theme.breakpoints.down('sm')]: {
        margin: '0 0 12px',
      },
    },
    title: {
      fontFamily: '"proxima-nova-bold", Georgia, sans-serif',
      fontSize: '14px',
      lineHeight: '20px',
      marginBottom: '8px',
    },
    description: {
      fontFamily: '"proxima-nova-thin", Georgia, sans-serif',
      fontSize: '16px',
      lineHeight: '24px',
      marginBottom: '24px',
    },
    navigation: {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
      '& li': {
        marginBottom: '16px',
      },
      '& li:last-child': {
        marginBottom: '0',
      },
    },
    addBorder: {
      borderBottom: '1px solid #1F1F1F',
      '& li:last-child': {
        marginBottom: '16px',
      },
    },
    link: {
      color: 'white',
      opacity: 0.75,
      '&:hover': {
        color: '#00BA81',
        opacity: 1,
      },
    },
  };
};

const mapStateToProps = _state => {
  const organizationId =
    _state.user.organizationId || sessionStorage.getItem('organizationId');
  const auth = getAuthorization(_state);

  return {
    auth,
    errors: _state.adminProfile.publishErrors,
    organization: _state.businesses.organization,
    organizationId,
    success: _state.adminProfile.publishSuccess,
    updatedOrganization: _state.adminProfile.updatedOrganization.data,
    schemaValidated: _state.validateYup.success,
    schemaFail: _state.validateYup.error,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    snackbar: bindActionCreators(snackbarActions, _dispatch),
    profile: bindActionCreators(profileActions, _dispatch),
    yupActions: bindActionCreators(yupActions, _dispatch),
  };
};

Navigation.propTypes = {
  auth: PropTypes.string,
  classes: PropTypes.shape({
    container: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    navigation: PropTypes.string,
    noBorder: PropTypes.string,
    title: PropTypes.string,
  }),
  displayName: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.shape({})),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  organization: PropTypes.shape({}),
  organizationId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  profile: PropTypes.shape({
    updatePublishStatus: PropTypes.func.isRequired,
  }),
  schemaFail: PropTypes.bool,
  schemaValidated: PropTypes.bool,
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func.isRequired,
  }),
  success: PropTypes.bool,
  updatedOrganization: PropTypes.shape({}),
  yupActions: PropTypes.shape({
    validateSchema: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Navigation)));

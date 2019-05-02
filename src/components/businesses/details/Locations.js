import React, {PureComponent, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router';
import {PropTypes} from 'prop-types';
import Modal from '@material-ui/core/Modal';

import LocationDetails from './LocationDetails';
import Location from './Location';

import {sortArrayBy} from '@Utils';

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    left: '50%',
    maxHeight: '70vh',
    outline: 'none',
    overflow: 'auto',
    padding: '32px 24px',
    position: 'absolute',
    top: '45%',
    transform: 'translate(-50%, -50%)',
    width: theme.spacing.unit * 70,
  },
});

class Locations extends PureComponent {
  state = {
    open: false,
    organizationSelected: this.props.locations[0],
    viewMore: true,
  };

  detailsClickedHandler = organizationSelected => {
    this.setState({open: true, organizationSelected});
  };

  closeModalHandler = () => {
    this.setState({open: false});
  };

  viewMoreHandler = () => {
    this.setState(prevState => {
      return {
        viewMore: !prevState.viewMore,
      };
    });
  };

  _getAddress = ({address_1, address_2, state_province, city, postal_code}) => {
    let address = '';

    if (address_2) {
      address = `${address_1}, ${address_2}, ${city}, ${state_province}, ${postal_code}`;
    } else {
      address = `${address_1}, ${city}, ${state_province}, ${postal_code}`;
    }

    return address;
  };

  _renderLocations = locations => {
    const elements = locations.map(location => {
      const phones = sortArrayBy(location.phones, 'id');
      let address = '';
      let title = '';

      if (location.address) {
        address = this._getAddress(location.address);
        title = location.address.city;
      }

      return (
        <Location
          address={address}
          title={title}
          email={location.email}
          phone={this._getFirstPhone(phones)}
          key={location.id}
          onDetailsClicked={() => this.detailsClickedHandler(location)}
        />
      );
    });

    return [
      <h2 key={1} className="detail-locations__title text-bold" key={0}>
        {'Other Location'}
      </h2>,
      ...elements,
      ,
    ];
  };

  _getFirstPhone = phones => {
    if (phones.length > 0) {
      return phones[0].number;
    }

    return '';
  };

  render() {
    const {locations, classes} = this.props;
    const {organizationSelected, viewMore} = this.state;
    let otherLocations;
    let otherLocationElements = null;
    let mainLocationsElements = null;
    const main = locations.find(location => location.is_primary);
    const other = locations.filter(location => !location.is_primary);

    if (locations.length > 1) {
      otherLocations = this._renderLocations(other);

      if (!viewMore) {
        otherLocationElements = [
          ...otherLocations,
          <Link
            key={'link'}
            className="detail-locations__all-locations"
            onClick={this.viewMoreHandler}
          >
            {'View Less'}
          </Link>,
        ];
      } else if (otherLocations.length > 2) {
        otherLocationElements = [
          otherLocations[0],
          otherLocations[1],
          <Link
            key={'link'}
            className="detail-locations__all-locations"
            onClick={this.viewMoreHandler}
          >
            {'View All Locations'}
          </Link>,
        ];
      } else {
        otherLocationElements = [...otherLocations];
      }

      const phones = sortArrayBy(main.phones, 'id');
      let address = '';
      let title = '';

      if (main.address) {
        address = this._getAddress(main.address);
        title = main.address.city;
      }

      mainLocationsElements = (
        <Location
          address={address}
          title={title}
          email={main.email}
          phone={this._getFirstPhone(phones)}
          onDetailsClicked={() => this.detailsClickedHandler(main)}
        />
      );
    }

    return (
      <div className="detail-locations">
        <Modal open={this.state.open} onClose={this.closeModalHandler}>
          <div className={classes.paper}>
            <LocationDetails
              organization={organizationSelected}
              closeModal={this.closeModalHandler}
            />
          </div>
        </Modal>
        <h2 className="details-title details-title--small-space text-bold">
          {'Main Location'}
        </h2>
        {mainLocationsElements}
        {otherLocationElements}
      </div>
    );
  }
}

Locations.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string,
  }),
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.shape({
        address_1: PropTypes.string,
        address_2: PropTypes.string,
        city: PropTypes.string,
        postal_code: PropTypes.string,
        state_province: PropTypes.string,
      }),
      email: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
      phones: PropTypes.array,
    })
  ),
};

export default withStyles(styles)(Locations);

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
    width: '500px',
  },
});

export const getFirstPhoneNumber = phones => {
  if (phones.length > 0) {
    return phones[0].number;
  }

  return '';
};

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
      address = `${address_1}, ${address_2}\n ${city}, ${state_province} ${postal_code}`;
    } else {
      address = `${address_1}\n ${city}, ${state_province} ${postal_code}`;
    }

    return address;
  };

  _renderLocations = locations => {
    const elements = locations.map(location => {
      const phones = sortArrayBy(location.phones, 'id');
      const title = location.alternate_name || location.name;
      let address = '';

      if (location.address) {
        address = this._getAddress(location.address);
      }

      return (
        <Location
          address={address}
          title={title}
          email={location.email}
          phone={getFirstPhoneNumber(phones)}
          key={location.id}
          onDetailsClicked={() => this.detailsClickedHandler(location)}
        />
      );
    });

    const title = (
      <h2 className="detail-locations__title text-bold" key={0}>
        {'Other Locations'}
      </h2>
    );

    return [title, ...elements];
  };

  render() {
    const {locations, classes} = this.props;
    const {organizationSelected, viewMore} = this.state;
    const main = locations.find(location => location.is_primary);
    const other = locations.filter(location => !location.is_primary);
    const otherLocations = this._renderLocations(other);
    let otherLocationElements = null;
    let mainLocationsElements = null;

    if (other.length > 1) {
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
      }
    } else if (other.length === 1) {
      otherLocationElements = [...otherLocations];
    }

    if (main) {
      const phones = sortArrayBy(main.phones, 'id');
      const title = main.alternate_name || main.name;
      let address = '';

      if (main.address) {
        address = this._getAddress(main.address);
      }

      mainLocationsElements = (
        <Fragment>
          <h2 className="details-title details-title--small-space text-bold">
            {'Main Location'}
          </h2>
          <Location
            address={address}
            title={title}
            email={main.email}
            phone={getFirstPhoneNumber(phones)}
            onDetailsClicked={() => this.detailsClickedHandler(main)}
          />
        </Fragment>
      );
    }

    if (!main && other.length === 0) {
      mainLocationsElements = <p>{'Location is not available.'}</p>;
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

import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router';
import Location from './Location';
import {PropTypes} from 'prop-types';
import Modal from '@material-ui/core/Modal';
import LocationDetails from './LocationDetails';

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    height: '75vh',
    left: '50%',
    outline: 'none',
    padding: '32px 24px',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: theme.spacing.unit * 70,
    borderRadius: '5px',
  },
});

class Locations extends PureComponent {
  state = {
    open: false,
    organizationSelected: this.props.locations[0],
  };

  detailsClickedHandler = organizationSelected => {
    this.setState({open: true, organizationSelected});
  };

  closeModalHandler = () => {
    this.setState({open: false});
  };

  render() {
    const {locations, classes} = this.props;
    const {organizationSelected} = this.state;

    let $otherLocation = null;

    if (locations.length > 1) {
      const mapOtherLocations = locations.map((location, index) => {
        if (index === 0) {
          return (
            <h2 key={1} className="detail-locations__title text-bold">
              {'Other Location'}
            </h2>
          );
        }
        const address = `${location.address.address_1}, ${
          location.address.address_2
        }, ${location.address.state_province} ${location.address.postal_code}`;

        return (
          <Location
            address={address}
            title={location.address.city}
            email="email@domaninname.com"
            phone="(916) 514-7044"
            key={location.id}
            onDetailsClicked={() => this.detailsClickedHandler(location)}
          />
        );
      });

      $otherLocation = [
        ...mapOtherLocations,
        <Link key={'link'} className="detail-locations__all-locations">
          {'View All Locations'}
        </Link>,
      ];
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
        <h2 className="detail-locations__title text-bold">{'Main Location'}</h2>
        <Location
          address={`${locations[0].address.address_1}, ${
            locations[0].address.address_2
          }, ${locations[0].address.state_province} ${
            locations[0].address.postal_code
          }`}
          title={locations[0].address.city}
          email="email@domaninname.com"
          phone="(916) 514-7044"
          onDetailsClicked={() => this.detailsClickedHandler(locations[0])}
        />
        {$otherLocation}
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

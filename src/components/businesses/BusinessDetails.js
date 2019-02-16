import React from 'react';
import {PropTypes} from 'prop-types';

import MainSection from './details/MainSection';
import ServicesOffered from './details/ServicesOffered';
import SocialBar from './details/SocialBar';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {containerStyles} from '../../utils';

const styles = theme => ({
  content: {
    ...containerStyles(theme),
  },
});
import LeftBar from './details/LeftBar';

const BusinessDetails = props => {
  const {organization, classes, events} = props;
  let $details = (
    <div className="load-div">
      <img className="loader" src="/static-data/images/loader.gif" />
      <h3 className="loader-text text-regular">{'Loading'}</h3>
    </div>
  );
  const socialInformation = {
    twitter: organization.twitter,
    facebook: organization.facebook,
    website: organization.website,
    phone: organization.phones && organization.phones[0].number,
    email: organization.email,
    linkedin: organization.linkedin,
  };

  if (Object.keys(organization).length) {
    $details = (
      <div className="business-deatils-wrapper">
        <MainSection organization={organization} />
        <SocialBar socialInformation={socialInformation} />

        <section className={['content-section', classes.content].join(' ')}>
          <Grid container={true}>
            <Grid item={true} xs={12} md={9}>
              <ServicesOffered services={organization.services} />
            </Grid>
            <Grid item={true} xs={12} md={3}>
              {events.length > 0 ? (
                <LeftBar organization={organization} events={events} />
              ) : null}
            </Grid>
          </Grid>
        </section>
      </div>
    );
  }

  return $details;
};

BusinessDetails.propTypes = {
  classes: PropTypes.shape({
    content: PropTypes.string,
  }),
  events: PropTypes.arrayOf(PropTypes.shape({})),
  organization: PropTypes.shape({
    services: PropTypes.arrayOf(PropTypes.object),
    locations: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default withStyles(styles)(BusinessDetails);

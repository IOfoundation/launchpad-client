import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MainSection from './details/MainSection';
import SocialBar from './details/SocialBar';
import RightBar from './details/RightBar';
import MainContent from './details/MainContent';

import {containerStyles} from '@Utils';

const BusinessDetails = props => {
  const {organization, classes, events, breakpoint} = props;

  let $details = (
    <div className="load-div">
      <img className="loader" src="/static-data/images/loader.gif" />
      <h3 className="loader-text text-regular">{'Loading'}</h3>
    </div>
  );

  if (Object.keys(organization).length > 0) {
    const socialInformation = {
      twitter: organization.twitter,
      facebook: organization.facebook,
      website: organization.website,
      email: organization.email,
      linkedin: organization.linkedin,
    };

    if (organization.phones.length > 0) {
      const sorted = organization.phones.sort((a, b) => a.id - b.id);

      socialInformation.phone = sorted[0].number;
    }

    $details = (
      <div className="business-deatils-wrapper">
        <MainSection organization={organization} />
        <SocialBar
          socialInformation={socialInformation}
          breakpoint={breakpoint}
        />
        <section className={'content-section'}>
          <Grid container={true} className={classes.content}>
            <Grid item={true} xs={12} md={9} className="right-line">
              <MainContent services={organization.services} />
            </Grid>
            <Grid item={true} xs={12} md={3}>
              <RightBar organization={organization} events={events} />
            </Grid>
          </Grid>
        </section>
      </div>
    );
  }

  return $details;
};

const styles = theme => ({
  content: {
    ...containerStyles(theme),
  },
});

BusinessDetails.propTypes = {
  breakpoint: PropTypes.string,
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

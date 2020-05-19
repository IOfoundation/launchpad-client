import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Description from './Service/Description';
import IncorporatedDate from './MainSection/IncorporatedDate';
import Accreditations from './MainSection/Accreditations';
import Licenses from './MainSection/Licenses';
import LegalStatus from './MainSection/LegalStatus';

import {truncate, maxCharacters, containerStyles} from '@Utils';

const MainSection = props => {
  const {organization, classes} = props;
  const {
    date_incorporated,
    accreditations,
    licenses,
    legal_status,
  } = organization;
  let description = organization.description;
  let image = null;

  if (description.split('').length > maxCharacters) {
    description = truncate(organization.description);
  }

  if (organization.logo_url) {
    image = (
      <img
        className="business-details-section__logo__img"
        src={organization.logo_url}
      />
    );
  }

  return (
    <section
      className={['business-details-section', classes.content].join(' ')}
    >
      <Grid container={true}>
        <Grid item={true} xs={12} md={8}>
          <div className="business-details-section__information">
            <h2 className="business-details-section__information__title text-semi">
              {organization.name || organization.alternate_name}
            </h2>
            <Description description={organization.description} />
            <div className={classes.details}>
              <Grid container={true} spacing={16}>
                <IncorporatedDate incorporatedDate={date_incorporated} />
                <Accreditations accreditations={accreditations} />
                <Licenses licenses={licenses} />
                <LegalStatus legalStatus={legal_status} />
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid item={true} xs={12} md={4}>
          <div className={`business-details-section__logo ${classes.logo}`}>
            <div className="business-details-section__logo__container">
              {image}
            </div>
          </div>
        </Grid>
      </Grid>
    </section>
  );
};

const styles = theme => ({
  content: {
    ...containerStyles(theme),
    margin: '40px auto',
  },
  details: {
    padding: '8px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '12px',
    },
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: '12px',
    },
  },
});

MainSection.propTypes = {
  classes: PropTypes.shape({
    content: PropTypes.string,
    details: PropTypes.string,
    logo: PropTypes.string,
  }),
  organization: PropTypes.shape({
    alternate_name: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    logo_url: PropTypes.string,
  }),
};

export default withStyles(styles)(MainSection);

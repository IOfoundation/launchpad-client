import React from 'react';
import {PropTypes} from 'prop-types';
import Grid from '@material-ui/core/Grid';

import LinkedinIcon from '../../shared/LinkedinIcon';
import FacebookIcon from '../../shared/FacebookIcon';
import TwitterIcon from '../../shared/TwitterIcon';

const SocialBar = props => {
  const {breakpoint, socialInformation} = props;
  const {
    email,
    phone,
    facebook,
    twitter,
    linkedin,
    website,
  } = socialInformation;

  return (
    <div style={{padding: '8px'}}>
      <Grid
        container={true}
        className="details-social-bar"
        alignContent="center"
        justify="center"
        alignItems="center"
        spacing={16}
      >
        <Grid
          item={true}
          xs={breakpoint === 'xs' ? 12 : null}
          style={{padding: '8px'}}
        >
          <Grid
            container={true}
            className="details-social-bar"
            alignContent="center"
            justify="center"
            alignItems="center"
            spacing={16}
          >
            <Grid item={true}>
              <a
                href={facebook}
                target="_blank"
                className="details-social-bar__icon"
                rel="noopener noreferrer"
              >
                <FacebookIcon size={24} />
              </a>
            </Grid>
            <Grid item={true}>
              <a
                href={twitter}
                target="_blank"
                className="details-social-bar__icon details-social-bar__icon--twitter"
                rel="noopener noreferrer"
              >
                <TwitterIcon size={30} />
              </a>
            </Grid>
            <Grid item={true}>
              <a
                href={linkedin}
                target="_blank"
                className="details-social-bar__icon"
                rel="noopener noreferrer"
              >
                <LinkedinIcon size={24} />
              </a>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true}>
          <a
            className="details-social-bar__item details-social-bar__item--button"
            target="_blank"
            href={website}
            rel="noopener noreferrer"
          >
            {'Go to Website'}
          </a>
        </Grid>
        <Grid item={true}>
          <span className="details-social-bar__text details-social-bar__text--mr">
            {phone}
          </span>
        </Grid>
        <Grid item={true}>
          <span className="details-social-bar__text">{email}</span>
        </Grid>
      </Grid>
    </div>
  );
};

SocialBar.propTypes = {
  breakpoint: PropTypes.string,
  socialInformation: PropTypes.shape({
    email: PropTypes.string,
    facebook: PropTypes.string,
    phone: PropTypes.string,
    twitter: PropTypes.string,
    website: PropTypes.string,
  }),
};

export default SocialBar;

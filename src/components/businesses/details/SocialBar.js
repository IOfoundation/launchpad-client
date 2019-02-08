import React from 'react';
import {PropTypes} from 'prop-types';

import LinkedinIcon from '../../shared/LinkedinIcon';
import FacebookIcon from '../../shared/FacebookIcon';
import TwitterIcon from '../../shared/TwitterIcon';

const SocialBar = props => {
  const {
    email,
    phone,
    facebook,
    twitter,
    linkedin,
    website,
  } = props.socialInformation;

  return (
    <div className="details-social-bar">
      <a
        href={facebook}
        target="_blank"
        className="details-social-bar__icon"
        rel="noopener noreferrer"
      >
        <FacebookIcon size={24} />
      </a>
      <a
        href={twitter}
        target="_blank"
        className="details-social-bar__icon details-social-bar__icon--twitter"
        rel="noopener noreferrer"
      >
        <TwitterIcon size={30} />
      </a>
      <a
        href={linkedin}
        target="_blank"
        className="details-social-bar__icon"
        rel="noopener noreferrer"
      >
        <LinkedinIcon size={24} />
      </a>
      <a
        className="details-social-bar__item details-social-bar__item--button"
        target="_blank"
        href={website}
        rel="noopener noreferrer"
      >
        {'Go to Website'}
      </a>
      <span className="details-social-bar__text details-social-bar__text--mr">
        {phone}
      </span>
      <span className="details-social-bar__text">{email}</span>
    </div>
  );
};

SocialBar.propTypes = {
  socialInformation: PropTypes.shape({
    email: PropTypes.string,
    facebook: PropTypes.string,
    phone: PropTypes.string,
    twitter: PropTypes.string,
    website: PropTypes.string,
  }),
};

export default SocialBar;

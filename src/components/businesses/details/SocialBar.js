import React from 'react';
import {PropTypes} from 'prop-types';
import {openUrl} from '../../../utils/utility';

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
      <img
        className="details-social-bar__item details-social-bar__item--icon"
        src="/static-data/icons/facebook-black.svg"
        onClick={() => openUrl(facebook)}
      />
      <img
        className="details-social-bar__item details-social-bar__item--icon"
        src="/static-data/icons/twitter-black.svg"
        onClick={() => openUrl(twitter)}
      />
      <img
        className="details-social-bar__item details-social-bar__item--icon"
        src="/static-data/icons/linkedin-black.svg"
        onClick={() => openUrl(linkedin)}
      />
      <button
        className="details-social-bar__item details-social-bar__item--button"
        onClick={() => openUrl(website)}
      >
        {'Go to Website'}
      </button>
      <span className="details-social-bar__text details-social-bar__item">
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

import React from 'react';
import {PropTypes} from 'prop-types';

const LocationDetailsSmallSection = props => {
  const {title, content} = props;
  const appendedTitle = `${title}: `;
  let $content = null;

  if (content) {
    $content = (
      <p className="location-details__section">
        <span className="text-bold">{appendedTitle}</span>
        {content}
      </p>
    );
  }

  return $content;
};

LocationDetailsSmallSection.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
};

export default LocationDetailsSmallSection;

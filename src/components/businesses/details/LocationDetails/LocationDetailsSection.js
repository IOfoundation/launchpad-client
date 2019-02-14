import React, {Fragment} from 'react';
import {PropTypes} from 'prop-types';

const LocationDetailsSection = props => {
  const {title, content} = props;
  const appendedTitle = `${title}: `;
  let $content = null;

  if (content) {
    $content = (
      <Fragment>
        <h3 className="location-details__subtitle text-bold">
          {appendedTitle}
        </h3>
        <p className="location-details__bottom-space">{content}</p>
      </Fragment>
    );
  }

  return $content;
};

LocationDetailsSection.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
};

export default LocationDetailsSection;

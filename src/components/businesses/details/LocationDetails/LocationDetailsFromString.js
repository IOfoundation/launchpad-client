import React, {Fragment} from 'react';
import {PropTypes} from 'prop-types';

const LocationDetailsSection = props => {
  const {title, content} = props;
  const appendedTitle = `${title}: `;
  const contentSplit = content.join(', ');
  let $content = null;

  if (content) {
    $content = (
      <Fragment>
        <LocationDetailsSection title={appendedTitle} content={contentSplit} />
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

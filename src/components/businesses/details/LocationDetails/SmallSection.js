import React from 'react';
import {PropTypes} from 'prop-types';

const SmallSection = props => {
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

SmallSection.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
};

export default SmallSection;

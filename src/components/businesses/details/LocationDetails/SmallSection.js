import React from 'react';
import {PropTypes} from 'prop-types';

const SmallSection = props => {
  const {title, content, extraSpace} = props;
  const appendedTitle = `${title}: `;
  let $content = null;

  if (content) {
    const classes = ['location-details__section'];

    if (extraSpace) {
      classes.push('location-details__section--extra-space');
    }

    $content = (
      <p className={classes.join(' ')}>
        <span className="text-bold">{appendedTitle}</span>
        {content}
      </p>
    );
  }

  return $content;
};

SmallSection.propTypes = {
  content: PropTypes.string,
  extraSpace: PropTypes.bool,
  title: PropTypes.string,
};

export default SmallSection;

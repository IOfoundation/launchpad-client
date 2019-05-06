import React, {Fragment} from 'react';
import {PropTypes} from 'prop-types';

const Section = props => {
  const {title, content, children, append = ': '} = props;
  const appendedTitle = `${title}${append}`;
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
  } else if (children) {
    $content = (
      <Fragment>
        <h3 className="location-details__subtitle text-bold">
          {appendedTitle}
        </h3>
        <div className="location-details__bottom-space">{children}</div>
      </Fragment>
    );
  }

  return $content;
};

Section.propTypes = {
  append: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Section;

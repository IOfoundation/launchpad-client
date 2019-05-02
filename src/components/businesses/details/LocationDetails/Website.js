import React from 'react';
import {PropTypes} from 'prop-types';

const Website = props => {
  const {title, content} = props;
  const appendedTitle = `${title}: `;
  let $content = null;

  if (content) {
    $content = (
      <p className="location-details__section">
        <span className="text-bold">{appendedTitle}</span>
        <a
          href={content}
          target="_blank"
          className="modal-events__link"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      </p>
    );
  }

  return $content;
};

Website.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
};

export default Website;

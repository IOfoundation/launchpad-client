import React from 'react';
import Section from './Section';
import {PropTypes} from 'prop-types';

export const PostedBy = props => {
  const {url, name} = props;
  let $content = null;

  if (url && name) {
    $content = (
      <Section modifier="extra-space">
        {'Posted By: '}
        <a
          href={url}
          target="_blank"
          className="modal-events__link"
          rel="noopener noreferrer"
        >
          {name}
        </a>
      </Section>
    );
  }

  return $content;
};

PostedBy.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
};

export default PostedBy;

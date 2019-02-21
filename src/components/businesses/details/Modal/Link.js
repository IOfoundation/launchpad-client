import React from 'react';
import Section from './Section';
import {PropTypes} from 'prop-types';

export const Link = props => {
  const {link} = props;
  let $content = null;

  if (link) {
    $content = (
      <Section modifiers={['extra-space', 'ml']}>
        <i className="material-icons modal-events__icon">{'link'}</i>
        <a
          href={link}
          target="_blank"
          className="modal-events__link"
          rel="noopener noreferrer"
        >
          {link}
        </a>
      </Section>
    );
  }

  return $content;
};

Link.propTypes = {
  link: PropTypes.string,
};

export default Link;

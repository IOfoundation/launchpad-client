import React from 'react';
import {PropTypes} from 'prop-types';

export const Section = props => {
  const {content, children, modifiers} = props;
  let $content = null;
  const classes = ['modal-events__section'];

  if (modifiers && modifiers.length > 0) {
    modifiers.forEach(modifier => {
      classes.push(`modal-events__section--${modifier}`);
    });
  }

  if (content) {
    $content = <div className={classes.join(' ')}>{content}</div>;
  }

  if (children) {
    $content = <div className={classes.join(' ')}>{children}</div>;
  }

  return $content;
};

Section.propTypes = {
  content: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.string),
};

export default Section;

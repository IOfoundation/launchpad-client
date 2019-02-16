import React from 'react';
import {PropTypes} from 'prop-types';

export const Section = props => {
  const {content, children, modifier} = props;
  let $content = null;
  const classes = ['modal-events__section'];

  if (modifier) {
    classes.push(`modal-events__section--${modifier}`);
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
  modifier: PropTypes.string,
};

export default Section;

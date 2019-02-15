import React, {Fragment} from 'react';
import {PropTypes} from 'prop-types';
import Section from './Section';

const FromString = props => {
  const {title, content} = props;
  const contentSplit = content.join(', ');
  let $content = null;

  if (content) {
    $content = (
      <Fragment>
        <Section title={title} content={contentSplit} />
      </Fragment>
    );
  }

  return $content;
};

FromString.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
};

export default FromString;

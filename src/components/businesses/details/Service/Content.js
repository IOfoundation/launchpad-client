import React from 'react';
import {PropTypes} from 'prop-types';

const Content = props => {
  const {title, content, children} = props;
  let $content = null;

  if (content || children) {
    $content = (
      <div className="service-content">
        <h3 className="service-content__title text-semi">{title}</h3>
        <div className="service-content__content">{content || children}</div>
      </div>
    );
  }

  return $content;
};

Content.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
};

export default Content;

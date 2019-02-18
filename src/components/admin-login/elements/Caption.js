import React from 'react';
import {PropTypes} from 'prop-types';

import Grid from '@material-ui/core/Grid';

const Caption = props => {
  const {title, content, children} = props;
  let $content;

  if (content) {
    $content = <p>{content}</p>;
  }

  if (children) {
    $content = children;
  }

  return (
    <Grid item={true} xs={12} md={8}>
      <h1>{title}</h1>
      {$content}
    </Grid>
  );
};

Caption.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
};

export default Caption;

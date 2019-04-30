import React from 'react';
import Grid from '@material-ui/core/Grid';
import {PropTypes} from 'prop-types';

const NewColumn = props => {
  const {title, content, children} = props;
  let $content = null;

  if (content || children) {
    const $contentParagraph = (
      <p className="service-column__content">{content}</p>
    );

    $content = (
      <Grid className="service-column" item={true} xs={12} sm={'auto'}>
        <h3 className="service-column__title text-semi">{title}</h3>
        {children || $contentParagraph}
      </Grid>
    );
  }

  return $content;
};

NewColumn.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
};

export default NewColumn;

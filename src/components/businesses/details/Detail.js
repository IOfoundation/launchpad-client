import React from 'react';
import {PropTypes} from 'prop-types';
import Grid from '@material-ui/core/Grid';

const Detail = props => {
  return (
    <Grid item={true}>
      <h4 className="business-detail__title text-semi">{props.title}</h4>
      <p className="business-detail__content">{props.content}</p>
    </Grid>
  );
};

Detail.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Detail;

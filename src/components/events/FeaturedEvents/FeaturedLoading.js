import React from 'react';
import Grid from '@material-ui/core/Grid';

const Loading = () => {
  return (
    <Grid item={true} xs={4}>
      <div className="post-lists-loading__element post-lists-loading__element__title animated-background animated-background--dark" />
      <div className="post-lists-loading__element" />
      <div className="post-lists-loading__element" />
      <div className="post-lists-loading__element" />
      <div className="post-lists-loading__element" />
      <div className="post-lists-loading__element" />
    </Grid>
  );
};

export default Loading;

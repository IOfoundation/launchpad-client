import React from 'react';
import Grid from '@material-ui/core/Grid';

const FeaturedEventLoading = () => {
  return (
    <Grid container={true} spacing={24}>
      <Grid item={true} xs={4}>
        <div className="post-lists-loading__element post-lists-loading__element__title animated-background animated-background--dark" />
        <div className="post-lists-loading__element" />
        <div className="post-lists-loading__element" />
        <div className="post-lists-loading__element" />
        <div className="post-lists-loading__element" />
        <div className="post-lists-loading__element" />
      </Grid>
      <Grid item={true} xs={4}>
        <div className="post-lists-loading__element post-lists-loading__element__title animated-background animated-background--dark" />
        <div className="post-lists-loading__element" />
        <div className="post-lists-loading__element" />
        <div className="post-lists-loading__element" />
        <div className="post-lists-loading__element" />
        <div className="post-lists-loading__element" />
      </Grid>
      <Grid item={true} xs={4}>
        <div className="post-lists-loading__element post-lists-loading__element__title animated-background animated-background--dark" />
        <div className="post-lists-loading__element" />
        <div className="post-lists-loading__element" />
        <div className="post-lists-loading__element" />
        <div className="post-lists-loading__element" />
        <div className="post-lists-loading__element" />
      </Grid>
    </Grid>
  );
};

export default FeaturedEventLoading;

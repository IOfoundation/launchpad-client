import React from 'react';
import Grid from '@material-ui/core/Grid';
import Loading from './FeaturedLoading';

const FeaturedEventLoading = () => {
  return (
    <Grid container={true} spacing={24}>
      <Loading />
      <Loading />
      <Loading />
    </Grid>
  );
};

export default FeaturedEventLoading;

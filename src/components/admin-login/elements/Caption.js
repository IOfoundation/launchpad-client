import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  Title: {
    fontSize: '48px',
    lineHeight: '60px',
    marginBottom: '24px',
  },
  item: {
    paddingRight: '10em',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
});
const Caption = props => {
  const {title, content, children, classes} = props;
  let $content;

  if (content) {
    $content = <p>{content}</p>;
  }

  if (children) {
    $content = children;
  }

  return (
    <Grid item={true} xs={12} md={7} classes={{item: classes.item}}>
      <h1 className={[classes.Title, 'text-semi'].join(' ')}>{title}</h1>
      {$content}
    </Grid>
  );
};

Caption.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classes: PropTypes.shape({
    Title: PropTypes.string,
    item: PropTypes.styring,
  }),
  content: PropTypes.string,
  title: PropTypes.string,
};

export default withStyles(styles)(Caption);

import React from 'react';
import {PropTypes} from 'prop-types';

import Caption from './elements/Caption';
import SignInFormContainer from './elements/SignInFormContainer';
import {withStyles} from '@material-ui/core/styles';
import Container from './Container';

const styles = theme => ({
  subTitle: {
    fontSize: '24px',
    lineHeight: '32px',
    marginBottom: '8px',
  },
});

const PasswordReset = props => {
  const {classes} = props;

  return (
    <Container>
      <Caption title="Reset your password" />
      <div>{'form recovery'}</div>
    </Container>
  );
};

PasswordReset.propTypes = {
  classes: PropTypes.shape({
    subTitle: PropTypes.string,
  }),
};

export default withStyles(styles)(PasswordReset);

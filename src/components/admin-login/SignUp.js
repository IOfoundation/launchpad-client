import React from 'react';
import {PropTypes} from 'prop-types';

import Caption from './elements/Caption';
import SignUpContainer from './elements/SignUpContainer';
import {withStyles} from '@material-ui/core/styles';
import Container from './Container';

const styles = () => ({
  subTitle: {
    fontSize: '24px',
    lineHeight: '32px',
    marginBottom: '8px',
  },
});

const SignUp = props => {
  const {classes} = props;

  return (
    <Container>
      <Caption title="List your resource.">
        <p className={[classes.subTitle, 'text-thin'].join(' ')}>
          {
            'Do you have a valuable service that businesses in Sacramento should know about? Create an account to request your resource listing.'
          }
        </p>
      </Caption>
      <SignUpContainer />
    </Container>
  );
};

SignUp.propTypes = {
  classes: PropTypes.shape({
    subTitle: PropTypes.string,
  }),
};

export default withStyles(styles)(SignUp);

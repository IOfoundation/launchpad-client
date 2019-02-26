import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';

import Caption from './elements/Caption';
import SignInFormContainer from './elements/SignInFormContainer';
import {withStyles} from '@material-ui/core/styles';
import Container from './Container';

const styles = () => ({
  subTitle: {
    fontSize: '24px',
    lineHeight: '32px',
    marginBottom: '8px',
  },
  anchor: {
    color: 'white',
    fontSize: '24px',
    lineHeight: '32px',
    textDecoration: 'underline',
    '&:hover': {
      color: '#02ba81',
    },
  },
});

const SignIn = props => {
  const {classes} = props;

  return (
    <Container>
      <Caption title="Log in to your admin account.">
        <p className={[classes.subTitle, 'text-thin'].join(' ')}>
          {"Have a resource you'd like listed?"}
        </p>
        <Link
          to="/admin-login/sign-up"
          className={[classes.anchor, 'text-thin'].join(' ')}
        >
          {'Sign up here'}
        </Link>
      </Caption>
      <SignInFormContainer />
    </Container>
  );
};

SignIn.propTypes = {
  classes: PropTypes.shape({
    anchor: PropTypes.string,
    subTitle: PropTypes.string,
  }),
};

export default withStyles(styles)(SignIn);

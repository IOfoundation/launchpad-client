import React from 'react';
import {PropTypes} from 'prop-types';

import Caption from './elements/Caption';
import Container from './Container';
import PasswordResetContainer from './elements/PasswordResetContainer';

const PasswordReset = () => {
  return (
    <Container>
      <Caption title="Reset your password." />
      <PasswordResetContainer />
    </Container>
  );
};

PasswordReset.propTypes = {
  classes: PropTypes.shape({
    subTitle: PropTypes.string,
  }),
};

export default PasswordReset;

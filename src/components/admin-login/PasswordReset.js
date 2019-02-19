import React from 'react';
import {PropTypes} from 'prop-types';

import Caption from './elements/Caption';
import Container from './Container';

const PasswordReset = () => {
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

export default PasswordReset;

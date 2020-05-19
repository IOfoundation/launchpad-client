import React from 'react';
import {PropTypes} from 'prop-types';

import Caption from './elements/Caption';
import Container from './Container';
import PasswordRecoveryContainer from './elements/PasswordRecoveryContainer';

const PasswordRecovery = () => {
  return (
    <Container>
      <Caption title="Set your new password." />
      <PasswordRecoveryContainer />
    </Container>
  );
};

PasswordRecovery.propTypes = {
  classes: PropTypes.shape({
    subTitle: PropTypes.string,
  }),
};

export default PasswordRecovery;

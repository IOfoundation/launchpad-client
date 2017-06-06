import React from 'react';
import {PropTypes} from 'prop-types';

import Header from '../shared/Header';
import Footer from '../shared/Footer';

const MainLayout = props => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {};

export default MainLayout;

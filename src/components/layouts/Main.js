import React from 'react';
import {PropTypes} from 'prop-types';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

const MainLayout = ({children}) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element,
};

export default MainLayout;

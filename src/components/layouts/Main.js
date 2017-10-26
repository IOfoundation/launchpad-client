import React from 'react';
import {PropTypes} from 'prop-types';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import MobileFooter from '../shared/mobileFooter';

const MainLayout = ({children}) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <MobileFooter />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element,
};

export default MainLayout;

import React from 'react';
import {PropTypes} from 'prop-types';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import MobileFooter from '../shared/MobileFooter';

const MainLayout = ({children, windowWidth, homePage}) => {
  const isMobile = windowWidth <= 960;
  return (
    <div>
      <Header homePage={homePage} />
      {children}
      {!isMobile && <Footer />}
      {isMobile && <MobileFooter />}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element,
  homePage: PropTypes.bool.isRequired,
  windowWidth: PropTypes.number,
};

export default MainLayout;

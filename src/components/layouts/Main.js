import React from 'react';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';

import Header from '@Shared/Header';
import Footer from '@Shared/Footer';
import MobileFooter from '@Shared/MobileFooter';

const MainLayout = ({children, windowWidth, homePage, router}) => {
  const isMobile = windowWidth <= 960;
  return (
    <div>
      <Header homePage={homePage} router={router} />
      {children}
      {!isMobile && <Footer />}
      {isMobile && <MobileFooter />}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element,
  homePage: PropTypes.bool.isRequired,
  router: PropTypes.shape({}),
  windowWidth: PropTypes.number,
};

export default withRouter(MainLayout);

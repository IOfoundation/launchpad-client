import React from 'react';
import {PropTypes} from 'prop-types';
import AdminHeader from '../shared/AdminHeader';
import Footer from '../shared/Footer';
import MobileFooter from '../shared/MobileFooter';

const AdminLayout = ({children, windowWidth, homePage}) => {
  const isMobile = windowWidth <= 960;
  return (
    <div>
      <AdminHeader homePage={homePage} />
      {children}
      {!isMobile && <Footer />}
      {isMobile && <MobileFooter />}
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.element,
  homePage: PropTypes.bool.isRequired,
  windowWidth: PropTypes.number,
};

export default AdminLayout;

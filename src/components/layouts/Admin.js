import React from 'react';
import {PropTypes} from 'prop-types';

import AdminHeader from '../shared/AdminHeader';
import Footer from '../shared/Footer';
import MobileFooter from '../shared/MobileFooter';

const AdminLayout = ({children, windowWidth, homePage, hideFooter}) => {
  const isMobile = windowWidth <= 960;
  let footer = !isMobile && <Footer />;
  let mobileFooter = !isMobile && <MobileFooter />;

  if (hideFooter) {
    footer = null;
    mobileFooter = null;
  }

  return (
    <div>
      <AdminHeader homePage={homePage} />
      {children}
      {footer}
      {mobileFooter}
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.element,
  hideFooter: PropTypes.bool,
  homePage: PropTypes.bool.isRequired,
  windowWidth: PropTypes.number,
};

export default AdminLayout;

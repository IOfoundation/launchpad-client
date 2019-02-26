import React from 'react';
import {Route, IndexRoute} from 'react-router';
require('dotenv').config();

// Main Component
import App from './components/App';

//Presentational components
import ContactUs from './components/static-pages/contact-us';
import TermsOfUse from './components/static-pages/terms-of-use';
import PrivacyPolicy from './components/static-pages/privacy-policy';
import NotFound from './components/static-pages/not-found';

//Containers components
import HomeContainer from './containers/Home';
import BusinessesContainer from './containers/Businesses';
import BusinessDetails from './containers/BusinessDetails';
import Blog from './containers/Blog';
import Events from './containers/Events';
import SignInRoute from './containers/AdminLogin/SignIn';
import PasswordResetRoute from './containers/AdminLogin/PasswordResetRoute';
import SignUpRoute from './containers/AdminLogin/SignUp';
import ResetYourPasswordRoute from './containers/AdminLogin/ResetYourPasswordRoute';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeContainer} />
    <Route path="/" component={HomeContainer} />
    <Route path="/businesses" exact={true} component={BusinessesContainer} />
    <Route path="/businesses/:id" component={BusinessDetails} />
    <Route path="contact-us" component={ContactUs} />
    <Route path="terms-of-use" component={TermsOfUse} />
    <Route path="privacy-policy" component={PrivacyPolicy} />
    <Route path="/blog" component={Blog} />
    <Route path="/events" component={Events} />
    <Route path="/admin-login" component={SignInRoute} />
    <Route path="/admin-login/password-reset" component={PasswordResetRoute} />
    <Route path="/admin-login/sign-up" component={SignUpRoute} />
    <Route
      path="/admin-login/password-reset-confirmation"
      component={ResetYourPasswordRoute}
    />
    <Route path="*" component={NotFound} />
  </Route>
);

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
    <Route path="*" component={NotFound} />
  </Route>
);

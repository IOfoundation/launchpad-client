import React from 'react';
import {Route, IndexRoute} from 'react-router';

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

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeContainer} />
    <Route path="/" component={HomeContainer} />
    <Route path="/businesses" component={BusinessesContainer} />
    <Route path="contact-us" component={ContactUs} />
    <Route path="terms-of-use" component={TermsOfUse} />
    <Route path="privacy-policy" component={PrivacyPolicy} />
    <Route path="*" component={NotFound} />
  </Route>
);

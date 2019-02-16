import React, {Fragment} from 'react';
import {PropTypes} from 'prop-types';

import DateSection from './DateSection';
import Section from './Section';
import PostedBy from './PostedBy';
import Link from './Link';

const Layout = props => {
  const {title, postedBy, date, address, link, description, closed} = props;

  return (
    <Fragment>
      <i className="material-icons modal-events__close" onClick={closed}>
        {'close'}
      </i>
      <h1 className="modal-events__title">{title}</h1>
      <PostedBy url={postedBy.website} name={postedBy.name} />
      <DateSection date={date} />
      <Section content={address} modifier="extra-space" />
      <Link link={link} />
      <Section content={description} />
    </Fragment>
  );
};

Layout.propTypes = {
  address: PropTypes.string,
  closed: PropTypes.func,
  date: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  postedBy: PropTypes.shape({
    name: PropTypes.string,
    website: PropTypes.string,
  }),
  title: PropTypes.string,
};

export default Layout;

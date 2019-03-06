import React, {Fragment} from 'react';
import {PropTypes} from 'prop-types';

import DateSection from '../../businesses/details/Modal/DateSection';
import Section from '../../businesses/details/Modal/Section';
import PostedBy from '../../businesses/details/Modal/PostedBy';
import Link from '../../businesses/details/Modal/Link';

const Content = props => {
  const {
    title,
    postedBy,
    address,
    link,
    description,
    closed,
    start,
    end,
  } = props;

  return (
    <Fragment>
      <i className="material-icons modal-events__close" onClick={closed}>
        {'close'}
      </i>
      <h1 className="modal-events__title">{title}</h1>
      <PostedBy url={postedBy.website} name={postedBy.name} />
      <DateSection start={start} end={end} />
      <Section content={address} modifiers={['extra-space']} />
      <Link link={link} />
      <Section content={description} />
    </Fragment>
  );
};

Content.propTypes = {
  address: PropTypes.string,
  closed: PropTypes.func,
  description: PropTypes.string,
  end: PropTypes.string,
  link: PropTypes.string,
  postedBy: PropTypes.shape({
    name: PropTypes.string,
    website: PropTypes.string,
  }),
  start: PropTypes.string,
  title: PropTypes.string,
};

export default Content;

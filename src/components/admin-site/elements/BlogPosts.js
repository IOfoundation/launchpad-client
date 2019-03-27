import React from 'react';
import {PropTypes} from 'prop-types';

import LandingComponent from '../Landing';
import Title from '../Title';
import Items from './BlogPosts/Items';
import Pagination from '../../businesses/Pagination';
import CustomTabs from '@Shared/Tabs';

import {drafts, posted} from './BlogPosts/mocks';

const BlogPosts = () => {
  const handleChangePage = () => {};

  return (
    <LandingComponent navigation={true}>
      <Title
        titleText="Your Blog Posts"
        hideCancelAction={true}
        submitLabel="Create Blog Post"
      />
      <CustomTabs tabs={['Drafts', 'Posted']}>
        <Items items={drafts} />
        <Items items={posted} />
      </CustomTabs>
      <Pagination
        appliedFilters={{category: 'admin-posts', page: 1}}
        handleChangePage={handleChangePage}
        metadata={{
          pagination: {
            last: {
              page: 10,
            },
            currentPage: 1,
          },
          totalOrganization: '10',
        }}
        noMargin={true}
      />
    </LandingComponent>
  );
};

BlogPosts.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default BlogPosts;

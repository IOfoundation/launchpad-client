import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import ContentMap from 'components/layouts/ContentMap';
import organizationFixture from 'tests/fixtures/organization';

const createProps = props => {
  return {
    businesses: props.businesses,
    children: null,
    expanded: false,
    expandMap: jest.fn(),
    handleChangePage: jest.fn(),
    highlightOrgCard: jest.fn(),
    isMobile: false,
    locations: [],
    onBoundsChange: jest.fn(),
    redoSearchInMap: jest.fn(),
    reduceMap: jest.fn(),
    selectedOrg: -1,
    showLoading: false,
    toggleSwitch: false,
    topBar: null,
  };
};

describe('<ContentMap />', () => {
  it('renders snapshot of ContentMap', () => {
    const props = createProps({
      businesses: {
        locations: [],
        organizations: [organizationFixture, organizationFixture],
        metadata: {totalOrganization: '50'},
        appliedFilters: {
          pagination: {
            first: {page: 1, per_page: 4},
            last: {},
            next: {},
            currentPage: 1,
          },
        },
      },
    });
    const wrapper = shallow(<ContentMap {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

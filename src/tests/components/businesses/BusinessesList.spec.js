import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import BusinessesList from '../../../components/businesses/BusinessesList';
import Business from '../../../components/businesses/Business';
import organizationFixture from '../../fixtures/organization';

const createProps = props => {
  return {
    organizations: props.organizations,
    isMobile: false,
    selectedOrg: -1,
  };
};

describe.skip('<BusinessesList />', () => {
  it('renders snapshot of BusinessesList -- one org in array', () => {
    const props = createProps({
      organizations: [organizationFixture],
    });
    const wrapper = mount(<BusinessesList {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders snapshot of BusinessesList -- with empty array', () => {
    const props = createProps({
      organizations: [],
    });
    const wrapper = mount(<BusinessesList {...props} />);
    const businesses = wrapper.find(Business);

    expect(businesses.length).toBe(0);
  });
});

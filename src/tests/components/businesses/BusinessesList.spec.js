import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import BusinessesList from '../../../components/businesses/BusinessesList';
import organizationFixture from '../../fixtures/organization';

const createProps = props => {
  return {
    organizations: props.organizations,
    isMobile: false,
    selectedOrg: -1,
  };
};

describe('<BusinessesList />', () => {
  it('renders snapshot of BusinessesList', () => {
    const props = createProps({
      organizations: [organizationFixture, organizationFixture],
    });
    const wrapper = shallow(<BusinessesList {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders snapshot of BusinessesList -- one org in array', () => {
    const props = createProps({
      organizations: [organizationFixture],
    });
    const wrapper = shallow(<BusinessesList {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders snapshot of BusinessesList -- empty state', () => {
    const props = createProps({
      organizations: [],
    });
    const wrapper = shallow(<BusinessesList {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

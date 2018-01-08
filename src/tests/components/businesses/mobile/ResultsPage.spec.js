import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import ResultsPage from 'components/businesses/mobile/ResultPage';
import organizationFixture from 'tests/fixtures/organization';

const createProps = () => {
  return {
    highlightOrgCard: jest.fn(),
    isMobile: false,
    locations: [],
    onBoundsChange: jest.fn(),
    organizations: [organizationFixture],
    showLoading: false,
    totalOrganizations: '50',
  };
};

describe('<ResultsPage />', () => {
  it('renders snapshot of ResultsPage', () => {
    const props = createProps();
    const wrapper = shallow(<ResultsPage {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

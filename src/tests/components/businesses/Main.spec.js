import React from 'react';
import {shallow} from 'enzyme';

import BusinessesPage from '../../../components/businesses/Main';
import {Link} from 'react-router';

const businesses = [];
const businessesMetadata = {};

function mockBusiness(overrides) {
  return {
    id: 1,
    name: 'Businesses1',
    Services: [
      {
        id: 1,
        name: 'Service1',
      },
      {
        id: 1,
        name: 'Service2',
      },
    ],
    Communities: [
      {
        id: 1,
        name: 'Community1',
      },
      {
        id: 1,
        name: 'Community2',
      },
    ],
    Stages: [
      {
        id: 1,
        name: 'Community1',
      },
      {
        id: 1,
        name: 'Community2',
      },
    ],
  };
}

describe('<BusinessesPage />', () => {
  it('Renders a ResultInfo component', () => {
    const wrapper = shallow(
      <BusinessesPage
        businesses={businesses}
        businessesMetadata={businessesMetadata}
      />
    );
    expect(wrapper.find('ResultInfo').length).toEqual(1);
  });

  it('Renders a BusinessesList component', () => {
    const wrapper = shallow(
      <BusinessesPage
        businesses={businesses}
        businessesMetadata={businessesMetadata}
      />
    );
    expect(wrapper.find('BusinessesList').length).toEqual(1);
  });

  it('Renders a Pagination component', () => {
    const wrapper = shallow(
      <BusinessesPage
        businesses={businesses}
        businessesMetadata={businessesMetadata}
      />
    );
    expect(wrapper.find('Pagination').length).toEqual(1);
  });

  it('Renders a MapView component', () => {
    const wrapper = shallow(
      <BusinessesPage
        businesses={businesses}
        businessesMetadata={businessesMetadata}
      />
    );
    expect(wrapper.find('MapView').length).toEqual(1);
  });
});

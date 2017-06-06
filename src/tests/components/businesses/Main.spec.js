import React from 'react';
import {shallow} from 'enzyme';

import BusinessesPage from '../../../components/businesses/Main';
import {Link} from 'react-router';

describe('<BusinessesPage />', () => {
  it('Renders a ResultInfo component', () => {
    const wrapper = shallow(<BusinessesPage />);
    expect(wrapper.find('ResultInfo').length).toEqual(1);
  });

  it('Renders a BusinessesList component', () => {
    const wrapper = shallow(<BusinessesPage />);
    expect(wrapper.find('BusinessesList').length).toEqual(1);
  });

  it('Renders a Pagination component', () => {
    const wrapper = shallow(<BusinessesPage />);
    expect(wrapper.find('Pagination').length).toEqual(1);
  });

  it('Renders a MapView component', () => {
    const wrapper = shallow(<BusinessesPage />);
    expect(wrapper.find('MapView').length).toEqual(1);
  });
});

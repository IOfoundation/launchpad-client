import React from 'react';
import {shallow} from 'enzyme';

import BusinessesPage from '../../../components/businesses/Main';
import MapView from '../../../components/map-view/Main';

const businesses = [];
const businessesMetadata = {};
const handleChangePage = jest.fn();
const handleClickOnBusiness = jest.fn();

describe('<BusinessesPage />', () => {
  it('Renders a BusinessesList component', () => {
    const wrapper = shallow(
      <BusinessesPage
        businesses={businesses}
        businessesMetadata={businessesMetadata}
        handleChangePage={handleChangePage}
        handleClickOnBusiness={handleClickOnBusiness}
      />
    );
    expect(wrapper.find('BusinessesList').length).toEqual(1);
  });

  it('Renders a Pagination component', () => {
    const wrapper = shallow(
      <BusinessesPage
        businesses={businesses}
        businessesMetadata={businessesMetadata}
        handleChangePage={handleChangePage}
        handleClickOnBusiness={handleClickOnBusiness}
      />
    );
    expect(wrapper.find('Pagination').length).toEqual(1);
  });
});

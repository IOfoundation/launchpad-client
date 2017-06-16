import React from 'react';
import {shallow} from 'enzyme';

import ResultInfo from '../../../components/businesses/ResultInfo';
import MetaInfoBusinesses
  from '../../../components/businesses/MetaInfoBusinesses';

describe('<ResultInfo />', () => {
  it('Renders MetaInfoBusinesses component', () => {
    const wrapper = shallow(
      <ResultInfo businessesMetadata={{pagination: {current_page: 1}}} />
    );
    expect(wrapper.find(MetaInfoBusinesses).length).toEqual(1);
  });

  it('Display the total Businesses found', () => {
    const wrapper = shallow(
      <ResultInfo
        businessesMetadata={{
          total_organizations: 10,
          pagination: {current_page: 1},
        }}
      />
    );
    expect(wrapper.contains('10 Resources Available')).toBe(true);
  });
});

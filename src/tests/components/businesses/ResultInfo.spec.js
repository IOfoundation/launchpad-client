import React from 'react';
import {shallow} from 'enzyme';

import ResultInfo from '../../../components/businesses/ResultInfo';

describe('<ResultInfo />', () => {
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

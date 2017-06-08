import React from 'react';
import {shallow} from 'enzyme';

import ResultInfo from '../../../components/businesses/ResultInfo';
import MetaInfoBusinesses
  from '../../../components/businesses/MetaInfoBusinesses';

describe('<ResultInfo />', () => {
  it('Renders MetaInfoBusinesses component', () => {
    const wrapper = shallow(
      <ResultInfo businessesMetadata={{pagination: {currentPage: 1}}} />
    );
    expect(wrapper.find(MetaInfoBusinesses).length).toEqual(1);
  });

  it('Display the total Businesses found', () => {
    const wrapper = shallow(
      <ResultInfo
        businessesMetadata={{totalBusinesses: 10, pagination: {currentPage: 1}}}
      />
    );
    expect(wrapper.contains('10 Resources Available')).toBe(true);
  });
});

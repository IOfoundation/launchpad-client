import React from 'react';
import {shallow} from 'enzyme';

import MetaInfoBusinesses from '../../../components/businesses/MetaInfoBusinesses';

describe('<MetaInfoBusinesses />', () => {
  it('Returns a span with the meta info of the Bussinesses that were found', () => {
    const wrapper = shallow(
      <MetaInfoBusinesses businessesMetadata={{pagination: {}}} />
    );
    expect(wrapper.find('span').length).toEqual(1);
  });
});

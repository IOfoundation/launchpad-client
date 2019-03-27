import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import Tabs from '../../../components/shared/Tabs';

const props = {
  tabs: ['1', '2'],
  children: [<p key={1}>{'Content 1'}</p>, <p key={2}>{'Content 2'}</p>],
};

describe('Shared <Tabs />', () => {
  it('renders snapshot of Tabs', () => {
    const wrapper = mount(<Tabs {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

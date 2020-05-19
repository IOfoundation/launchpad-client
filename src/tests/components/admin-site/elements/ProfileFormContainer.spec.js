import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import ProfileFormContainer from '../../../../components/admin-site/elements/ProfileFormContainer';

describe('Admin-site <ProfileFormContainer />', () => {
  it('renders snapshot of ProfileFormContainer', () => {
    const wrapper = shallow(<ProfileFormContainer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

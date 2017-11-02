import React from 'react';
import {shallow} from 'enzyme';

import MainLayout from '../../../components/layouts/Main';
import Header from '../../../components/shared/Header';
import Footer from '../../../components/shared/Footer';
import MobileFooter from '../../../components/shared/MobileFooter';

describe('<MainLayout />', () => {
  it('Render the Header component', () => {
    const wrapper = shallow(<MainLayout />);
    expect(wrapper.find(Header).length).toEqual(1);
  });

  it('Render the Footer component', () => {
    const wrapper = shallow(<MainLayout />);
    expect(wrapper.find(Footer).length).toEqual(1);
  });

  it('Render the childrens added to the layout', () => {
    const wrapper = shallow(
      <MainLayout>
        <div className={'children'} />
      </MainLayout>
    );
    expect(wrapper.find('.children').length).toEqual(1);
  });
});

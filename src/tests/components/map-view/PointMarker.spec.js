import React from 'react';
import {shallow} from 'enzyme';
import PointMarker from '../../../components/map-view/PointMarker';

describe('<PointMarker />', () => {
  it('Render a div', () => {
    const wrapper = shallow(<PointMarker text={'Hello'} />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('Render the text sent in the props', () => {
    const wrapper = shallow(<PointMarker text={'Hello'} />);
    expect(wrapper.contains('Hello')).toBe(true);
  });
});

import React from 'react';
import {shallow} from 'enzyme';
import PointMarker from '../../../components/map-view/PointMarker';
import {MdPlace} from 'react-icons/lib/md';

describe('<PointMarker />', () => {
  it('Render a div', () => {
    const wrapper = shallow(<PointMarker />);
    expect(
      wrapper.find(<MdPlace className="map_marker" size={40} />).length
    ).toEqual(1);
  });
});

import React from 'react';
import {shallow} from 'enzyme';
import PointMarker from '../../../components/map-view/PointMarker';
import {MdPlace} from 'react-icons/lib/md';

describe('<PointMarker />', () => {
  it('Render marker', () => {
    const wrapper = shallow(<PointMarker />);
    expect(
      wrapper.contains(
        <MdPlace
          className="map_marker"
          size={40}
          onClick={() => this.props.showModal()}
        />
      )
    );
  });
});

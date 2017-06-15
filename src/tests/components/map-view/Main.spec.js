import React from 'react';
import {shallow} from 'enzyme';

import MapView from '../../../components/map-view/Main';
import Marker from '../../../components/map-view/PointMarker';
import GoogleMapReact from 'google-map-react';

describe('<MainLayout />', () => {
  it('Render the GoogleMapReact component', () => {
    const wrapper = shallow(<MapView businesses={[]} />);
    expect(wrapper.find(GoogleMapReact).length).toEqual(1);
  });

  it('Render a Marker for every bussiness', () => {
    const wrapper = shallow(
      <MapView
        businesses={[
          {id: 1, location: {}},
          {id: 2, location: {}},
          {id: 3, location: {}},
        ]}
      />
    );
    expect(wrapper.find(Marker).length).toEqual(3);
  });
});

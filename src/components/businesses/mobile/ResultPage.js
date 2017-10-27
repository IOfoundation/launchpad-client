import React, {Component} from 'react';
import MapView from '../../map-view/Main';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

class ResultPage extends Component {
  constructor() {
    super();
    this.state = {
      tabIndex: 0,
    };
  }

  render() {
    const {tabIndex} = this.state;
    return (
      <div className="mobile-devices">
        <Tabs
          selectedIndex={this.state.tabIndex}
          onSelect={tabIndex => this.setState({tabIndex})}
        >
          <TabList className="tabs-container">
            <span>
              {this.props.TotalOrganizations} {'Resources Available'}
            </span>
            <Tab className="tab">
              <img src={
                  this.state.tabIndex === 0 ? (
                    '../../static-data/images/ic_map_list-view-Green.png'
                  ) : (
                    '../../static-data/images/ic_map_list-view-Grey.png'
                  )
                }
              />
            </Tab>
            <Tab className="tab">
              <img src={
                  this.state.tabIndex === 1 ? (
                    '../../static-data/images/ic_map_green.png'
                  ) : (
                    '../../static-data/images/ic_map_grey.png'
                  )
                }
              />
            </Tab>
          </TabList>
          <TabPanel className="m-x-8">{this.props.BusinessesList}</TabPanel>
          <TabPanel>
            <div className="map-container">
              <MapView
                locations={this.props.locations}
                onBoundsChange={this.props.onBoundsChange}
              />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default ResultPage;

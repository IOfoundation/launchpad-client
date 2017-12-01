import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import MapView from '../../map-view/Main';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
  }

  handleOnSelect(tabIndex) {
    return this.setState({tabIndex});
  }

  render() {
    const {selectedTab} = this.state;
    const {showLoading} = this.props;
    const {businessesMetadata: {totalOrganizations}} = this.props;
    return (
      <div>
        <Tabs
          selectedIndex={selectedTab}
          onSelect={selectedTab => this.setState({selectedTab})}
        >
          <TabList className="tabs-container">
            <span>
              {showLoading
                ? 'Loading Organizations'
                : totalOrganizations == 1
                  ? `${totalOrganizations} Organization Available`
                  : `${totalOrganizations} Organizations Available`}
            </span>
            <Tab className="tab">
              <img
                src={
                  tabIndex === 0
                    ? '../../static-data/images/ic_map_list-view-Green.png'
                    : '../../static-data/images/ic_map_list-view-Grey.png'
                }
              />
            </Tab>
            <Tab className="tab">
              <img
                src={
                  tabIndex === 1
                    ? '../../static-data/images/ic_map_green.png'
                    : '../../static-data/images/ic_map_grey.png'
                }
              />
            </Tab>
          </TabList>
          <TabPanel className="m-x-8">{BusinessesList}</TabPanel>
          <TabPanel>
            <div className="map-container">
              <MapView
                locations={locations}
                onBoundsChange={onBoundsChange}
                highlightOrgCard={highlightOrgCard}
              />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

ResultPage.PropTypes = {
  showLoading: PropTypes.bool,
  TotalOrganizations: PropTypes.array,
  BusinessesList: PropTypes.array,
  locations: PropTypes.array,
  onBoundsChange: PropTypes.func,
};

export default ResultPage;

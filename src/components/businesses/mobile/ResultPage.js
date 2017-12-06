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

  handleOnSelect = selectedTab => {
    return this.setState({selectedTab});
  };

  displayOrganizationLabel = totalOrganizations => {
    return totalOrganizations === 1
      ? `${totalOrganizations} Organization Available`
      : `${totalOrganizations} Organizations Available`;
  };

  render() {
    const {selectedTab} = this.state;
    const {
      showLoading,
      totalOrganizations,
      BusinessesList,
      locations,
      onBoundsChange,
      highlightOrgCard,
    } = this.props;
    return (
      <div>
        <Tabs selectedIndex={selectedTab} onSelect={this.handleOnSelect}>
          <TabList className="tabs-container">
            <span>
              {showLoading
                ? 'Loading Organizations'
                : displayOrganizationLabel(totalOrganizations)}
            </span>
            <Tab className="tab">
              <img
                src={
                  selectedTab === 0
                    ? '../../static-data/images/ic_map_list-view-Green.png'
                    : '../../static-data/images/ic_map_list-view-Grey.png'
                }
              />
            </Tab>
            <Tab className="tab">
              <img
                src={
                  selectedTab === 1
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
                isMobile={this.props.isMobile}
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

ResultPage.propTypes = {
  BusinessesList: PropTypes.arrayOf(PropTypes.object),
  highlightOrgCard: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object),
  onBoundsChange: PropTypes.func,
  showLoading: PropTypes.bool,
  totalOrganizations: PropTypes.number,
};

export default ResultPage;

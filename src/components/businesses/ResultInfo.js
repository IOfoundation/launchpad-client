import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {FaSortDesc} from 'react-icons/lib/fa';

class ResultInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
    };
  }
  _toggleOptions() {
    this.setState({showOptions: !this.state.showOptions});
  }
  _renderOptions() {
    return (
      <div className="filterSelect_dropdown">
        <p className="smallFont primary filterSelect_dropdown_title">
          {'Sort Results'}
        </p>
        <button className="filterSelect_option">
          <span className="filterSelect_text">{'Test filter'}</span>
        </button>
      </div>
    );
  }
  render() {
    const {businessesMetadata} = this.props;
    return (
      <div className="businessList_top">
        <div className="row between-xs middle-xs businessList_top_content col-xs-6">
          <span className="secondary bold bodyFont">{`${businessesMetadata.total_organizations} Resources Available`}</span>
          <div
            className="businessList_top_filter row middle-xs noPadding"
            onClick={() => this._toggleOptions()}
          >
            <p className="businessList_top_filter_text">
              {'Sort Results'}
            </p>
            <FaSortDesc
              className="businessList_top_filter_icon"
              size={16}
              color={'#000'}
            />

            {this.state.showOptions ? this._renderOptions() : null}
          </div>
        </div>
      </div>
    );
  }
}

ResultInfo.propTypes = {
  businessesMetadata: PropTypes.object.isRequired,
};

export default ResultInfo;

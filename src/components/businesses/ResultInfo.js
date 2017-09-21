import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {MdPlace} from 'react-icons/lib/md';
import {MdKeyboardArrowRight} from 'react-icons/lib/md';

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

  render() {
    const {businessesMetadata: {total_organizations}} = this.props;
    return (
      <div className="container-center--medium">
        <p className="m-left-24 m-bot-16">
          {'Select a business type that represents you.'}
        </p>
        <button className="btn btn-search btn-outline m-left-24">
          <div className="btn-search-text">
            <span>{'Startup or High'}</span>
            <span>{'Growth Business'}</span>
          </div>
          <MdKeyboardArrowRight className="btn-search-icon" size="32" />
        </button>
        <button className="btn btn-search m-right-24 m-left-24 btn-outline">
          <div className="btn-search-text">
            <span>{'Main Street/'}</span>
            <span>{'Small Business'}</span>
          </div>
          <MdKeyboardArrowRight className="btn-search-icon" size="32" />
        </button>
        <button className="btn btn-search btn-outline">
          <div className="btn-search-text">
            <span>{'Microenterprise or'}</span>
            <span>{'Home-Based Business'}</span>
          </div>
          <MdKeyboardArrowRight className="btn-search-icon" size="32" />
        </button>
        <h3 className="m-left-24 m-top-24">{`${total_organizations} Resources Available`}</h3>
        <hr className="m-left-24 m-bot-24" />
      </div>
    );
  }
}

ResultInfo.propTypes = {
  businessesMetadata: PropTypes.object.isRequired,
};

export default ResultInfo;

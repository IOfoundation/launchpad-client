import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
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
    const {businessesMetadata: {totalOrganizations}} = this.props;
    return (
      <div className="container-center--medium grid">
        <p className="m-bot-16 col-xs-12 col-md-12 col-lg-12">
          {'Select a business type that represents you.'}
        </p>
        <div className="col-xs-12 col-md-4 col-lg-4 m-bot-16 p-right-0">
          <button className="btn btn-search btn-outline">
            <div className="btn-search-text">
              <span>{'Startup or High'}</span>
              <span>{'Growth Business'}</span>
            </div>
            <MdKeyboardArrowRight className="btn-search-icon" size="32" />
          </button>
        </div>
        <div className="col-xs-12 col-md-4 col-lg-4 m-bot-16 p-right-0">
          <button className="btn btn-search btn-outline">
            <div className="btn-search-text">
              <span>{'Main Street/'}</span>
              <span>{'Small Business'}</span>
            </div>
            <MdKeyboardArrowRight className="btn-search-icon" size="32" />
          </button>
        </div>
        <div className="col-xs-12 col-md-4 col-lg-4 m-bot-16 p-right-0">
          <button className="btn btn-search btn-outline">
            <div className="btn-search-text">
              <span>{'Microenterprise or'}</span>
              <span>{'Home-Based Business'}</span>
            </div>
            <MdKeyboardArrowRight className="btn-search-icon" size="32" />
          </button>
        </div>
        <h3 className="m-left-16 m-top-24 col-xs-12 col-md-12 col-lg-12 noPadding">{`${totalOrganizations} Resources Available`}</h3>
        <hr className="m-left-16 m-bot-24" />
      </div>
    );
  }
}

ResultInfo.propTypes = {
  businessesMetadata: PropTypes.object.isRequired,
};

export default ResultInfo;

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {MdSearch} from 'react-icons/lib/md';

class FilterByTextMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }
  handleKeyPress(e) {
    const value = e.target.value;
    this.setState({searchText: value});
    this.props.getTextSearchResults(value);
  }
  render() {
    return (
      <div>
        <div className="p-left-16 p-right-16">
          <input
            type="text"
            value={this.state.searchText}
            onChange={e => this.handleKeyPress(e)}
            className="text-search full-width-search"
            placeholder="Or search by name"
          />
          <MdSearch className="text-search-icon" size={24} color="#2AD587" />
        </div>
      </div>
    );
  }
}
FilterByTextMobile.PropTypes = {
  getFilterChips: PropTypes.func.isRequired,
  getTextSearchResults: PropTypes.func.isRequired,
};
export default FilterByTextMobile;

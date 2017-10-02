import React from 'react';
import {PropTypes} from 'prop-types';
import {MdSearch} from 'react-icons/lib/md';
import {MdClear} from 'react-icons/lib/md';

class FilterByText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelTop: false,
      showFilterLabel: false,
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleKeyPress(target) {
    if (target.charCode === 13 ) {
      this.setState({showFilterLabel: true});
      this.setState({labelTop: false});
    }
  }
  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.handleTextSearchBusinesses(event.target.value);
  }
  _inputClicked() {
    this.setState({labelTop: true});
  }
  _closeSearch() {
    this.setState({labelTop: false});
    this.setState({value: ''});
  }
  render() {
    return (
      <div className="col-md-12 col-xs-12 text-xs-margin m-bot-16 filterTextContainer noPadding">
        <div className="grid search-text-form" >
          <div className={this.state.showFilterLabel ? 'filter-label-container-show' : 'filter-label-container-hide'}>
            <a className="search-filter-label">{this.state.value} <MdClear className="search-filter-icon"/></a>
            <a className="search-filter-clear">Clear All</a>
          </div>
          <h3
            className={
              this.state.labelTop ? (
                'col-lg-8 hide-filter'
              ) : (
                'show-filter col-lg-8 p-left-0'
              )
            }
          >
            {'Filter results with the selections below'}
          </h3>

          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onClick={() => this._inputClicked()}
            onKeyPress={target => this.handleKeyPress(target)}
            placeholder={
              this.state.labelTop ? (
                'Search by Resource Name or Ipsum'
              ) : (
                'Or search by name'
              )
            }
            className={
              this.state.labelTop ? (
                'full-width-search'
              ) : (
                'text-search small-width-search col-md-4'
              )
            }
          />
          {this.state.labelTop && (
            <MdClear
              className="text-search-icon"
              size="32"
              color="#2AD587"
              onClick={() => this._closeSearch()}
            />
          )}
          {!this.state.labelTop && (
            <MdSearch className="text-search-icon" size="32" color="#2AD587" />
          )}
        </div>
      </div>
    );
  }
}

FilterByText.propTypes = {
  handleTextSearchBusinesses: PropTypes.func.isRequired,
};

export default FilterByText;

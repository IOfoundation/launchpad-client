import React from 'react';
import {PropTypes} from 'prop-types';
import {MdSearch} from 'react-icons/lib/md';
import {MdClear} from 'react-icons/lib/md';
import Chip from '../filters/Chip';

class FilterByText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelTop: false,
      showFilterLabel: false,
      value: '',
      filters: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleKeyPress(event) {
    if (event.charCode === 13) {
      const {filters} = this.state;
      if (filters.indexOf(this.state.value) === -1) {
        this.setState({
          showFilterLabel: true,
          labelTop: false,
          filters: [...filters, this.state.value],
          value: '',
        });
        this.props.handleTextSearchBusinesses([...filters, this.state.value]);
      } else {
        this._closeSearch();
      }
    }
  }
  deleteFilter(e) {
    const filter = e.currentTarget.getAttribute('data-value');
    const filters = this.state.filters.filter(item => item !== filter);
    this.setState({filters});
    this.props.handleTextSearchBusinesses(filters);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  _inputClicked() {
    this.setState({labelTop: true});
  }
  _closeSearch() {
    this.setState({labelTop: false, value: ''});
  }
  clearAll() {
    this.setState({filters: []});
    this.props.handleTextSearchBusinesses([]);
  }
  renderFilter() {
    return this.state.filters.map(filter => (
      <Chip
        key={filter}
        text={filter}
        handleClick={this.deleteFilter.bind(this)}
      />
    ));
  }
  render() {
    return (
      <div className="col-md-12 col-xs-12 text-xs-margin filterTextContainer noPadding">
        <div className="grid search-text-form p-bot-16">
          <div
            className={
              this.state.filters.length > 0 ? (
                'filter-label-container-show'
              ) : (
                'filter-label-container-hide'
              )
            }
          >
            {this.renderFilter()}
            <a className="search-filter-clear" onClick={() => this.clearAll()}>
              {'Clear All'}
            </a>
          </div>
          <h3
            className={
              this.state.labelTop || this.state.filters.length > 0 ? (
                'col-lg-9 hide-filter'
              ) : (
                'show-filter col-lg-9 p-left-0'
              )
            }
          >
            {'Filter results with the selections below'}
          </h3>

          <input
            type="text"
            value={this.state.value}
            onChange={event => this.handleChange(event)}
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
                'text-search small-width-search col-md-3'
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

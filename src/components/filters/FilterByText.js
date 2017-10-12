import React from 'react';
import {PropTypes} from 'prop-types';
import {MdSearch} from 'react-icons/lib/md';
import {MdClear} from 'react-icons/lib/md';
import Chip from '../filters/Chip';
import {isEmpty, isString} from 'lodash';

class FilterByText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelTop: false,
      showFilterLabel: false,
      showDropdown: false,
      value: '',
    };
  }
  deleteFilter(e) {
    const filter = e.currentTarget.getAttribute('data-value');
    this.props.handleOnRemoveFilterOption(filter);
  }

  clearAll() {
    this.setState({showFilterLabel: false, labelTop: false});
    this.props.handleClickOnClearAllFilters();
  }

  _inputClicked() {
    this.setState({labelTop: true});
  }

  _closeSearch() {
    this.setState({labelTop: false});
  }

  handleKeyPress(value) {
    this.setState({value: event.target.value, showDropdown: true});
    this.props.handleTextSearchBusinesses(value);
    if (isEmpty(value)) {
      this.setState({showDropdown: false});
    }
  }

  handleClickOutside() {
    this.setState({labelTop: false});
  }

  renderFilter() {
    const filters = this.props.getFilterChips();
    if (isEmpty(filters.category)) {
      return null;
    } else if (isString(filters.category)) {
      return (
        <Chip
          key={filters.category}
          text={filters.category}
          handleClick={this.deleteFilter.bind(this)}
        />
      );
    }
    return filters.category.map(filter => (
      <Chip
        key={filter}
        text={filter}
        handleClick={this.deleteFilter.bind(this)}
      />
    ));
  }

  renderDropdown() {
    return (
      <ul className="option-dropdown-list">
        {this.props.search_results.map(search_result => (
          <li key={search_result.id}>
            <a
              href={search_result.searchable_type === 'id' &&
                `/businesses?id=${search_result.searchable_id}`
              }
            >
              {search_result.content}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const filters = this.props.getFilterChips();
    return (
      <div
        className={
          this.state.labelTop ? (
            'col-md-12 col-xs-12 text-xs-margin filterTextContainer noPadding m-bot-16'
          ) : (
            'col-md-12 col-xs-12 text-xs-margin filterTextContainer noPadding'
          )
        }
      >
        <div className="grid search-text-form p-bot-16">
          <div
            className={
              isEmpty(filters) || this.state.labelTop ? (
                'filter-label-container-hide'
              ) : (
                'filter-label-container-show col-lg-9 noPadding'
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
              isEmpty(filters) ? (
                'show-filter col-lg-9 p-left-0'
              ) : (
                'col-lg-9 hide-filter'
              )
            }
          >
            {'Filter results with the selections below'}
          </h3>
          <div
            className={
              this.state.labelTop ? (
                'full-width-text-filter'
              ) : (
                'col-lg-3 noPadding'
              )
            }
          >
            <input
              type="text"
              value={this.state.value}
              onClick={() => this._inputClicked()}
              onKeyUp={e => this.handleKeyPress(e.target.value)}
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
                  'text-search small-width-search'
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
          </div>
          <div
            className={
              this.state.showDropdown ? 'option-dropdown-show' : 'hero_input-hide'
            }
          >
            {this.renderDropdown()}
          </div>
          {!this.state.labelTop && (
            <MdSearch className="text-search-icon" size="32" color="#2AD587" />
          )}
        </div>
      </div>
    );
  }
}

FilterByText.propTypes = {
  getFilterChips: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnRemoveFilterOption: PropTypes.func.isRequired,
  handleTextSearchBusinesses: PropTypes.func.isRequired,
  search_results: PropTypes.arrayOf(PropTypes.object),
};

export default FilterByText;

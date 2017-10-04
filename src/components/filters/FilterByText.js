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
    this.props.handleTextSearchBusinesses([]);
  }
  renderFilter() {
    const filters = this.props.getFilterChips()
    if (isEmpty(filters.category)) {
      return (null);
    } else if (isString(filters.category)) {
      return (
        <Chip
          key={filters.category}
          text={filters.category}
          handleClick={this.deleteFilter.bind(this)}
        />
      )
    } else {
      return filters.category.map(filter => (
        <Chip
          key={filter}
          text={filter}
          handleClick={this.deleteFilter.bind(this)}
        />
      ));
    }
  }
  render() {
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
          <div className="filter-label-container-show">
            {this.renderFilter()}
            <a className="search-filter-clear" onClick={() => this.clearAll()}>
              {'Clear All'}
            </a>
          </div>
          <h3
            className={
              this.state.labelTop ? (
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
          <div
            className={this.state.labelTop ? (
                'option-dropdown-show'
              ) : (
                'hero_input-hide'
              )
            }
          >
            <ul className="option-dropdown-list">
              <li>
                Business
                <img src="../static-data/images/LocationBlack.png" />
              </li>
              <li>
                Business
                <img src="../static-data/images/LocationBlack.png" />
              </li>
            </ul>
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
  handleTextSearchBusinesses: PropTypes.func.isRequired,
  handleOnRemoveFilterOption: PropTypes.func.isRequired
};

export default FilterByText;

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {MdSearch} from 'react-icons/lib/md';
import Chip from '../../shared/Chip';
import {isEmpty, isString} from 'lodash';

class FilterByTextMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      showDropdown: false,
    };
  }
  deleteFilter(e) {
    const filter = e.currentTarget.getAttribute('data-value');
    this.props.handleOnChangeFilterOptions(filter, 'category', true);
  }

  clearAll() {
    this.setState({showFilterLabel: false, labelTop: false});
    this.props.handleClickOnClearAllFilters();
  }

  handleDropdownOnClick(item) {
    item.searchable_type === 'Category' ? (
      this.props.handleOnChangeFilterOptions(item.content, 'category')
    ) : (
      this.props.handleOnChangeFilterOptions(item.searchable_id, 'organization')
    );
    this.setState({showDropdown: false, value: ''});
  }

  handleKeyPress(e) {
    const value = e.target.value;
    this.setState({searchText: value, showDropdown: true});
    this.props.getTextSearchResults(value);
    if (isEmpty(value)) {
      this.setState({showDropdown: false});
    }
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
          handleClick={(e) => this.deleteFilter(e)}
          canDelete={true}
        />
      );
    }
    return filters.category.map(filter => (
      <Chip
        key={filter}
        text={filter}
        handleClick={e => this.deleteFilter(e)}
        canDelete={true}
      />
    ));
  }

  renderDropdown() {
    return (
      <ul className="option-dropdown-list">
        {this.props.items.map(item => (
          <li key={item.id}>
            <a onClick={e => this.handleDropdownOnClick(item, e)}>
              {item.content}
            </a>
            {item.searchable_type === 'Organization' ? (
              <img src="../static-data/images/organization.png" />
            ) : null}
          </li>
        ))}
        {!this.props.items.length && (
          <li className="not-match-message">
            <a>{'This does not match any item on our platform'}</a>
          </li>
        )}
      </ul>
    );
  }

  render() {
    const filters = this.props.getFilterChips();
    return (
      <div className="filter-chip">
        <div className="p-left-16 p-right-16">
          <h3 className="col-lg-7 noPadding">
            {'Filter results with the selections below'}
          </h3>
          {this.renderFilter()}
          <a className="search-filter-clear" onClick={() => this.clearAll()}>
            {'Clear All'}
          </a>
        </div>
        <div className="search-input-container p-left-16 p-right-16 m-top-16">
          <input
            type="text"
            value={this.state.searchText}
            onChange={e => this.handleKeyPress(e)}
            className="text-search full-width-search"
            placeholder="Or search by name"
          />
          <MdSearch className="text-search-icon" size={24} color="#2AD587" />
        </div>
        <div
          className={
            this.state.showDropdown ? 'option-dropdown-show' : 'hero_input-hide'
          }
        >
          {this.renderDropdown()}
        </div>
      </div>
    );
  }
}
FilterByTextMobile.PropTypes = {
  getFilterChips: PropTypes.func.isRequired,
  getTextSearchResults: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  handleDropdownOnClick: PropTypes.func.isRequired,
};
export default FilterByTextMobile;

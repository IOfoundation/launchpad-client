import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Chip from '../../shared/Chip';
import {isEmpty, isString} from 'lodash';
import TagsBox from '../TagsBox';

class FilterByTextMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      showDropdown: false,
      filterById: props.filterById && true,
    };
  }

  deleteFilter = e => {
    const filter = e.currentTarget.getAttribute('data-value');
    this.props.handleOnChangeFilterOptions(filter, 'category', true);
  }

  clearAll = () => {
    this.setState({showFilterLabel: false, searchText: ''});
    this.props.handleClickOnClearAllFilters();
  }

  handleDropdownOnClick(item) {
    item.searchable_type === 'Category' ? this.props.handleOnChangeFilterOptions(item.content, 'category')
      : this.props.handleOnChangeFilterOptions(
          item.searchable_id,
          'organization',
          false
        );
    this.setState({
      showDropdown: false,
      value: '',
      searchText: item.content,
      searchPlaceHolder: item.content
    });
  }

  handleKeyPress(e) {
    const value = e.target.value;
    this.setState({searchText: value, showDropdown: true, filterById: false});
    this.props.getTextSearchResults(value);
    if (isEmpty(value)) {
      this.setState({showDropdown: false});
    }
  }
  renderChipsContainer(filters) {
    return (
      <div
        className={
          isEmpty(filters)
            ? 'filter-label-container-hide'
            : 'filter-label-container-show'
        }
      >
        <TagsBox
          filters={filters}
          deleteFilter={this.deleteFilter}
          clearAll={this.clearAll}
        />
      </div>
    );
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
    const filters = this.props.appliedFilters;
    const organization = this.props.organization.length ? this.props.organization[0].name : '';
    return (
      <div className="filter-chip">
        {filters.category && (
          <div className="filter-by-text-transition p-left-16 p-right-16 m-bot-16 m-top-20">
            <h3 className="col-lg-12 col-md-12 col-xs-12 no-padding">
              {'Filter results with the selections below'}
            </h3>
            {this.renderChipsContainer(filters)}
          </div>
        )}
        <div className="search-input-container p-left-16 p-right-16">
          <input
            type="text"
            value={this.state.filterById === true && isEmpty(filters) ? organization : this.state.searchText}
            onChange={e => this.handleKeyPress(e)}
            className="search-by-text text-thin"
            placeholder="Or search by name"
          />
          <img
            className="search-by-text-icon"
            src="/static-data/images/search.png"
          />
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
  appliedFilters: PropTypes.object,
  getTextSearchResults: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  handleDropdownOnClick: PropTypes.func.isRequired,
};
export default FilterByTextMobile;

import React, {PureComponent} from 'react';
import {FilterTypesConstants as filterTypes} from '../../../constants';
import {PropTypes} from 'prop-types';
import {isEmpty} from 'lodash';
import TagsBox from '../TagsBox';

class FilterByTextMobile extends PureComponent {
  state = {
    searchText: '',
    showDropdown: false,
    filterById: this.props.filterById && true,
  };

  deleteFilter = e => {
    const filter = e.currentTarget.getAttribute('data-value');
    this.props.handleOnChangeFilterOptions('category', filter, true);
  };

  clearAll = () => {
    this.setState({showFilterLabel: false, searchText: ''});
    this.props.handleClickOnClearAllFilters();
  };

  handleDropdownOnClick(item) {
    this.setState({
      showDropdown: false,
      value: '',
      searchText: item.content,
      searchPlaceHolder: item.content,
    });
    return item.searchable_type === filterTypes.CATEGORY
      ? this.props.handleOnChangeFilterOptions('category', item.content)
      : this.props.handleOnChangeFilterOptions(
          'organization',
          item.searchable_id,
          false
        );
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
            : 'filter-label-container-show text-bold'
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
            {item.searchable_type === filterTypes.ORGANIZATION ? (
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
    const {appliedFilters, organizations} = this.props;
    const [organization] = organizations;
    return (
      <div className="filter-chip">
        {appliedFilters.category && (
          <div className="filter-by-text-transition p-left-16 p-right-16 m-bot-16 m-top-20">
            <h3 className="col-lg-12 col-md-12 col-xs-12 no-padding">
              {'Filter results with the selections below'}
            </h3>
            {this.renderChipsContainer(appliedFilters)}
          </div>
        )}
        <div className="search-input-container p-left-16 p-right-16">
          <input
            type="text"
            value={
              this.state.filterById === true &&
              isEmpty(appliedFilters) &&
              !isEmpty(organizations)
                ? organization.name
                : this.state.searchText
            }
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
FilterByTextMobile.propTypes = {
  appliedFilters: PropTypes.shape({
    category: PropTypes.string,
    page: PropTypes.number,
  }),
  filterById: PropTypes.bool,
  getTextSearchResults: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  organizations: PropTypes.arrayOf(PropTypes.object),
};
export default FilterByTextMobile;

import React from 'react';
import {PropTypes} from 'prop-types';
import {MdClear} from 'react-icons/lib/md';
import Chip from '../shared/Chip';
import onClickOutside from 'react-onclickoutside';
import {isEmpty, isString} from 'lodash';

class FilterByText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelTop: false,
      showFilterLabel: false,
      showDropdown: false,
      searchText: '',
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

  _inputClicked() {
    this.setState({labelTop: true});
  }

  _closeSearch() {
    this.setState({labelTop: false, showDropdown: false, searchText: ''});
  }

  handleKeyPress(event) {
    const value = event.target.value;
    this.setState({searchText: value, showDropdown: true});
    this.props.getTextSearchResults(value);
    if (isEmpty(value)) {
      this.setState({showDropdown: false});
    }
  }

  handleClickOutside() {
    this.setState({labelTop: false, showDropdown: false, value: ''});
  }

  handleDropdownOnClick(item) {
    item.searchable_type === 'Category' ? (
      this.props.handleOnChangeFilterOptions(item.content, 'category')
    ) : (
      this.props.handleOnChangeFilterOptions(item.searchable_id, 'organization')
    );
    this.setState({showDropdown: false, labelTop: false, value: ''});
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
      <div className="col-md-12 col-xs-12 text-xs-margin filterTextContainer noPadding">
        <div className="grid search-text-form p-bot-16">
          <div
            className={
              isEmpty(filters) ? (
                'filter-label-container-hide'
              ) : (
                'filter-label-container-show col-lg-8 col-md-7 col-xs-7 noPadding'
              )
            }
          >
            {this.renderFilter()}
            <a className="search-filter-clear" onClick={() => this.clearAll()}>
              {'Clear All'}
            </a>
          </div>
          <h3
            className={isEmpty(filters) ? 'filter-result-text col-lg-8 col-md-7 col-xs-7 noPadding' : 'hide-filter'}
          >
            {'Filter results with the selections below'}
          </h3>
          <div
            className="small-filter-container col-lg-4 col-md-5 col-xs-5 noPadding">
            <input
              type="text"
              value={this.state.searchText}
              onClick={() => this._inputClicked()}
              onChange={e => this.handleKeyPress(e)}
              placeholder={
                this.state.labelTop ? (
                  'Search by Resource Name'
                ) : (
                  'Or search by name'
                )
              }
              className="search-by-text"/>
          {!this.state.labelTop ? (
              <img
                className="search-by-text-icon"
                src="../static-data/images/search.png"
              />
          ) : (
              <MdClear
                className="search-by-text-icon"
                size="40"
                color="#2AD587"
                onClick={() => this._closeSearch()}
              />
          )}
          </div>
          <div
            className={
              this.state.showDropdown ? (
                'option-dropdown-show'
              ) : (
                'hero_input-hide'
              )
            }
          >
            {this.renderDropdown()}
          </div>
        </div>
      </div>
    );
  }
}

FilterByText.propTypes = {
  getFilterChips: PropTypes.func.isRequired,
  getTextSearchResults: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
};

export default onClickOutside(FilterByText);

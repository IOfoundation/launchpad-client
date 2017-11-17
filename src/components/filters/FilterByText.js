import React from 'react';
import {PropTypes} from 'prop-types';
import ClearIcon from '../shared/ClearIcon';
import Chip from '../shared/Chip';
import onClickOutside from 'react-onclickoutside';
import {isEmpty, isString} from 'lodash';

class FilterByText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputOnFocus: false,
      showDropdown: false,
      searchText: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = this.props.appliedFilters !== nextProps.appliedFilters ? true : false;
    shouldUpdate = this.state.searchText !== nextState.searchText ? true : false;
    return shouldUpdate;
  }

  deleteFilter(e) {
    const filter = e.currentTarget.getAttribute('data-value');
    this.props.handleOnChangeFilterOptions(filter, 'category', true);
  }

  clearAll() {
    this.setState({inputOnFocus: false, searchText: ''});
    this.props.handleClickOnClearAllFilters();
  }

  _inputClicked() {
    this.setState({inputOnFocus: true});
  }

  _closeSearch() {
    this.setState({
      inputOnFocus: false,
      showDropdown: false,
      searchText: '',
    });
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
    this.setState({
      inputOnFocus: false,
      showDropdown: false,
    });
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
      inputOnFocus: false,
      value: item.content,
      searchText: item.content,
    });
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
        {this.renderFilter()}
        {filters.category && (
          <a
            className="search-filter-clear text-thin"
            onClick={() => this.clearAll()}
          >
            {'Clear All'}
          </a>
        )}
      </div>
    );
  }
  renderFilter() {
    const filters = this.props.appliedFilters;
    if (isEmpty(filters.category)) {
      return null;
    } else if (isString(filters.category)) {
      return (
        <Chip
          key={filters.category}
          text={filters.category}
          handleClick={e => this.deleteFilter(e)}
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
  getFilterByTextIcon() {
    return (
      <div>
        {this.state.inputOnFocus ? (
          <a onClick={() => this._closeSearch()}>
            <ClearIcon
              className="search-by-text-icon"
              size="40"
              style={{color: '#2AD587', verticalAlign: 'middle'}}
            />
          </a>
        ) : (
          <img
            className="search-by-text-icon"
            src="../static-data/images/search.png"
          />
        )}
      </div>
    );
  }
  renderDropdown() {
    return (
      <ul className="option-dropdown-list">
        {this.props.items.map(item => (
          <li
            key={item.id}
            className={item.searchable_type === 'Organization' && 'text-thin'}
          >
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
    return (
      <div className="col-md-12 col-xs-12 text-xs-margin filterTextContainer no-padding">
        <div className="grid search-text-form p-bot-16">
          <div
            className={
              this.state.inputOnFocus
                ? 'col-lg-8 col-md-7 col-xs-7 no-padding'
                : 'filter-by-text-transition col-lg-9 col-md-8 col-xs-8 no-padding'
            }
          >
            {this.renderChipsContainer(filters)}
            <h3
              className={
                filters.category
                  ? 'hide-filter'
                  : 'text-thin filter-result-text'
              }
            >
              {'Filter results with the selections below'}
            </h3>
          </div>
          <div
            className={
              this.state.inputOnFocus
                ? 'filter-by-text-transition col-lg-4 col-md-5 col-xs-5 no-padding'
                : 'filter-by-text-transition col-lg-3 col-md-4 col-xs-4 no-padding'
            }
          >
            <input
              type="text"
              className="search-by-text text-thin"
              value={filters.category ? '' : this.state.searchText}
              onClick={() => this._inputClicked()}
              onChange={e => this.handleKeyPress(e)}
              placeholder={
                this.state.inputOnFocus
                  ? 'Search by Resource Name'
                  : 'Or search by name'
              }
            />
            {this.getFilterByTextIcon()}
          </div>
          <div
            className={
              this.state.showDropdown
                ? 'option-dropdown-show'
                : 'hero_input-hide'
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
  appliedFilters: PropTypes.arrayOf(PropTypes.object),
  getTextSearchResults: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
};

export default onClickOutside(FilterByText);

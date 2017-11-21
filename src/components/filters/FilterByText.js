import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import ClearIcon from '../shared/ClearIcon';
import onClickOutside from 'react-onclickoutside';
import {isEmpty} from 'lodash';
import TagsBox from './TagsBox';

class FilterByText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputOnFocus: false,
      showDropdown: false,
      searchText: '',
      filterById: props.filterById && true,
    };
  }
  deleteFilter = e => {
    const filter = e.currentTarget.getAttribute('data-value');
    this.props.handleOnChangeFilterOptions('category', filter, true);
  };

  clearAll = () => {
    this.setState({inputOnFocus: false, searchText: ''});
    this.props.handleClickOnClearAllFilters();
  };

  handleInputClicked() {
    this.setState({inputOnFocus: true});
  }

  _closeSearch() {
    this.setState({
      showDropdown: false,
      searchText: '',
      filterById: false,
      inputOnFocus: false,
    });
    this.props.handleClickOnClearAllFilters();
  }

  handleKeyPress(event) {
    const value = event.target.value;
    this.setState({searchText: value, showDropdown: true, filterById: false});
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
    item.searchable_type === 'Category'
      ? this.props.handleOnChangeFilterOptions('category', item.content)
      : this.props.handleOnChangeFilterOptions(
          'organization',
          item.searchable_id,
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
        <TagsBox
          filters={filters}
          deleteFilter={this.deleteFilter}
          clearAll={this.clearAll}
        />
      </div>
    );
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
    const organization = this.props.organization.length
      ? this.props.organization[0].name
      : '';
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
                ? 'filter-by-text-transition col-lg-4 col-md-5 col-xs-5 no-padding position-relative'
                : 'filter-by-text-transition col-lg-3 col-md-4 col-xs-4 no-padding position-relative'
            }
          >
            <input
              type="text"
              className="search-by-text text-thin"
              value={
                this.state.filterById === true && isEmpty(filters)
                  ? organization
                  : this.state.searchText
              }
              onChange={e => this.handleKeyPress(e)}
              onClick={() => this.handleInputClicked()}
              placeholder="Search by Resource Name"
              style={
                this.state.inputOnFocus ||
                this.state.searchText ||
                (this.state.filterById && isEmpty(filters))
                  ? {opacity: 1}
                  : {opacity: 0}
              }
            />
            <a
              style={
                this.state.inputOnFocus ||
                this.state.searchText ||
                (this.state.filterById && isEmpty(filters))
                  ? {opacity: 0}
                  : {opacity: 1}
              }
              className="fake-placeholder text-thin"
            >
              {'Or '}
              <span className="underline-text">{'search'}</span> {'by name'}
            </a>
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
  appliedFilters: PropTypes.object,
  filterById: PropTypes.bool,
  getTextSearchResults: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
};

export default onClickOutside(FilterByText);

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import ClearIcon from '../shared/ClearIcon';
import onClickOutside from 'react-onclickoutside';
import {isEmpty} from 'lodash';
import TagsBox from './TagsBox';

class FilterByText extends Component {
  state = {
    inputOnFocus: false,
    showDropdown: false,
    searchText: '',
    organizations: this.props.organizations,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.organizations.length !== prevState.organizations.length) {
      if (nextProps.filterById && !isEmpty(nextProps.organizations)) {
        return {
          searchText: nextProps.organizations[0].name,
          organizations: nextProps.organizations,
        };
      }
      return {searchText: '', organizations: nextProps.organizations};
    }
    return null;
  }

  deleteFilter = e => {
    const filter = e.currentTarget.getAttribute('data-value');
    this.props.handleOnChangeFilterOptions('category', filter, true);
  };

  clearAll = () => {
    this.setState({inputOnFocus: false, searchText: ''});
    this.props.handleClickOnClearAllFilters();
  };

  handleInputClicked = () => {
    this.setState({inputOnFocus: true});
  };

  _closeSearch = () => {
    this.setState({
      showDropdown: false,
      searchText: '',
      inputOnFocus: false,
    });
    this.props.handleClickOnClearAllFilters();
  };
  handleKeyPress = event => {
    const value = event.target.value;
    this.setState({searchText: value, showDropdown: true});
    this.props.getTextSearchResults(value);
    if (isEmpty(value)) {
      this.setState({showDropdown: false});
    }
  };
  handleClickOutside = () => {
    this.setState({
      inputOnFocus: false,
      showDropdown: false,
    });
  };

  handleDropdownOnClick = item => {
    if (item.searchable_type === 'Category') {
      this.props.handleOnChangeFilterOptions('category', item.content);
    } else {
      this.props.handleOnChangeFilterOptions(
        'organization',
        item.searchable_id,
        false
      );
    }
    this.setState({
      showDropdown: false,
      inputOnFocus: false,
      value: item.content,
      searchText: item.content,
    });
  };

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
  getFilterByTextIcon() {
    return (
      <div>
        {this.state.inputOnFocus ? (
          <a onClick={() => this._closeSearch()}>
            <ClearIcon
              className="search-by-text-icon"
              size={40}
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
    const {appliedFilters, filterById} = this.props;
    return (
      <div className="col-md-12 col-xs-12 text-xs-margin filterTextContainer no-padding">
        <div className="grid search-text-form p-bot-16">
          <div
            className={
              this.state.inputOnFocus
                ? 'col-lg-7 col-md-6 col-xs-6 no-padding'
                : 'filter-by-text-transition col-lg-8 col-md-7 col-xs-7 no-padding'
            }
          >
            {this.renderChipsContainer(appliedFilters)}
            <h3
              className={
                isEmpty(appliedFilters.category)
                  ? 'filter-result-text'
                  : 'hide-filter'
              }
            >
              {'Filter results with the selections below'}
            </h3>
          </div>
          <div
            className={
              this.state.inputOnFocus
                ? 'filter-by-text-transition col-lg-5 col-md-6 col-xs-6 no-padding position-relative'
                : 'filter-by-text-transition col-lg-4 col-md-5 col-xs-5 no-padding position-relative'
            }
          >
            <input
              type="text"
              className="search-by-text"
              value={this.state.searchText}
              onChange={e => this.handleKeyPress(e)}
              onClick={() => this.handleInputClicked()}
              placeholder="Search by Resource Name"
              style={
                this.state.inputOnFocus || this.state.searchText || filterById
                  ? {opacity: 1}
                  : {opacity: 0}
              }
            />
            <a
              style={
                this.state.inputOnFocus || this.state.searchText || filterById
                  ? {opacity: 0}
                  : {opacity: 1}
              }
              className="fake-placeholder"
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
  appliedFilters: PropTypes.shape({
    category: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  filterById: PropTypes.bool,
  getTextSearchResults: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default onClickOutside(FilterByText);

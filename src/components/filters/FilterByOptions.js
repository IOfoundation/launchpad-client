import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import ArrowRight from '../shared/ArrowRight';
import DropdownArrow from '../shared/DropdownArrow';

class FilterByOptions extends Component {
  state = {
    dropdownOpen: false,
    subDropdownOpen: false,
    selectedfilterOption: null,
  };
  _toggleDropdownOptions() {
    this.setState({dropdownOpen: !this.state.dropdownOpen});
  }
  _toggleSubOption(event, selectedfilterOption) {
    if (selectedfilterOption.children.length > 0) {
      this.setState({selectedfilterOption, subDropdownOpen: true});
    }
  }
  handleClick = name => {
    this.props.handleOnChangeFilterOptions('category', name);
    this.setState({subDropdownOpen: false});
    this._toggleDropdownOptions();
  };

  handleClickOutside() {
    this.setState({
      dropdownOpen: false,
      subDropdownOpen: false,
      selectedfilterOption: null,
    });
  }
  filterBtnOption(filterOption) {
    return (
      <button
        className="dropdown-options"
        key={filterOption.id}
        onClick={() => this.handleClick(filterOption.name)}
        onMouseOver={e => this._toggleSubOption(e, filterOption)}
      >
        <span>{filterOption.name}</span>
        {filterOption.children.length > 0 && (
          <ArrowRight className="dropdown-options-icon" size={20} />
        )}
      </button>
    );
  }
  _renderSubOptions(filterOption) {
    return (
      <div className="dropdown-sub-container">
        {filterOption.children.map(child => (
          <button
            className="dropdown-options"
            key={child.id}
            onClick={() => this.handleClick(child.name)}
          >
            <span>{child.name}</span>
          </button>
        ))}
      </div>
    );
  }
  _renderOptions() {
    return (
      <div
        className={
          this.state.subDropdownOpen
            ? 'dropdown-container dropdown-container-expand'
            : 'dropdown-container'
        }
      >
        <div
          className={
            this.state.subDropdownOpen
              ? 'dropdown-btn-half'
              : 'dropdown-btn-full'
          }
        >
          {this.props.filterOptions.map(filterOption => (
            <div key={filterOption.id}>
              {this.filterBtnOption(filterOption)}
            </div>
          ))}
        </div>
        {this.state.selectedfilterOption &&
          this._renderSubOptions(this.state.selectedfilterOption)}
      </div>
    );
  }
  render() {
    return (
      <div className="col-md-3 col-xs-3 no-padding filter-btn-container text-xs-margin">
        <button
          className="filter-btn"
          onClick={() => this._toggleDropdownOptions()}
        >
          <span
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              display: 'block',
              paddingRight: '32px',
            }}
          >
            {this.props.filterName}
          </span>
          <DropdownArrow className="filter-btn-icon" size={32} />
        </button>
        {this.state.dropdownOpen && this._renderOptions()}
      </div>
    );
  }
}

FilterByOptions.propTypes = {
  filterName: PropTypes.string.isRequired,
  filterOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnChangeFilterOptions: PropTypes.func,
};
export default onClickOutside(FilterByOptions);

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import RightArrow from 'react-icons/lib/fa/angle-right';
import {MdKeyboardArrowRight} from 'react-icons/lib/md';

class FilterOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedfilterOption: null,
    };
  }
  uncheckAll() {
    const checks = document.querySelectorAll(
      '.dropdown-input-container' + ' input[type="checkbox"]'
    );
    for (const i = 0; i < checks.length; i++) {
      const check = checks[i];
      if (!check.disabled) {
        check.checked = false;
      }
    }
  }
  _onClick(event, selectedfilterOption) {
    this.uncheckAll();
    this.props.handleOnChangeFilterOptions(
      selectedfilterOption.name,
      'category'
    );
  }
  _toggleSubOption(event, selectedfilterOption) {
    this.props.handleOnChangeFilterOptions(
      selectedfilterOption.name,
      'category'
    );
    this.uncheckAll();
    if (selectedfilterOption.children.length > 0) {
      this.setState({selectedfilterOption, subDropdownOpen: true});
    }
  }
  _renderSubOptions(filterOption) {
    return (
      <ul>
        {filterOption.children.map(child => (
          <li key={child.id} onClick={e => this._onClick(e, child)}>
            {child.name}
          </li>
        ))}
      </ul>
    );
  }
  _renderOptions() {
    return (
      <ul>
        {this.props.filterOptions.map(filterOption => (
          <li key={filterOption.id}>
            <input type="checkbox" id={filterOption.name} />
            <div className="hover">
              <a onClick={e => this._toggleSubOption(e, filterOption)}>{filterOption.name}</a>
              {filterOption.children.length > 0 && (
                <label htmlFor={filterOption.name}>
                <MdKeyboardArrowRight className="second-level-icon" size="20" />
                </label>
              )}
            </div>
            {filterOption.children.length > 0 && (
              <div className="filters-third-level">
                {this._renderSubOptions(filterOption)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  }
  render() {
    const {filterName} = this.props;
    return (
      <ul className="filter-list">
        <li>
          <input type="checkbox" id={filterName} />
          <div className="select">
            <label>{filterName}</label>
            <label htmlFor={filterName}><RightArrow className="first-level-icon" /></label>
          </div>
          <div className="filters-second-level">{this._renderOptions()}</div>
        </li>
      </ul>
    );
  }
}

FilterOption.propTypes = {
  filterName: PropTypes.string.isRequired,
  filterOptions: PropTypes.array.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
};
export default FilterOption;

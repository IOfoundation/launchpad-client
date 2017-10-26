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
  _onClick(selectedfilterOption) {
    this.props.handleOnChangeFilterOptions(selectedfilterOption.name, 'category');
  }
  _toggleSubOption(event, selectedfilterOption) {
    this.props.handleOnChangeFilterOptions(selectedfilterOption.name, 'category');
    if (selectedfilterOption.children.length > 0) {
      this.setState({selectedfilterOption, subDropdownOpen: true});
    }
  }
  _renderSubOptions(filterOption) {
    return (
      <ul>
        {filterOption.children.map(child => (
          <li
            key={child.id}
            onClick={() => this.props.handleOnChangeFilterOptions(child.name, 'category')}
          >
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
          <li
            key={filterOption.id}
            onClick={e => this._toggleSubOption(e, filterOption)}
          >
            <input type="checkbox" id={filterOption.id} />
            <div className="hover">
              <label htmlFor={filterOption.id}>{filterOption.name}</label>
              {filterOption.children.length > 0 && (
                <MdKeyboardArrowRight className="second-level-icon" size="20" />
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
            <label htmlFor={filterName}>{filterName}</label>
            <RightArrow className="first-level-icon" />
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

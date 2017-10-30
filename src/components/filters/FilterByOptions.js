import React from 'react';
import {PropTypes} from 'prop-types';
import {FaSortDesc} from 'react-icons/lib/fa';
import onClickOutside from 'react-onclickoutside';
import {MdKeyboardArrowRight} from 'react-icons/lib/md';

class FilterByOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      subDropdownOpen: false,
      selectedfilterOption: null,
    };
  }
  _toggleDropdownOptions() {
    this.setState({dropdownOpen: !this.state.dropdownOpen});
  }
  _toggleSubOption(event, selectedfilterOption) {
    if (selectedfilterOption.children.length > 0) {
      this.setState({selectedfilterOption, subDropdownOpen: true});
    }
  }
  _onClick(selectedfilterOption) {
    this.props.handleOnChangeFilterOptions(selectedfilterOption.name, 'category');
  }
  handleClickOutside() {
    this.setState({
      dropdownOpen: false,
      subDropdownOpen: false,
      selectedfilterOption: null,
    });
  }
  _renderSubOptions(filterOption) {
    return (
      <div className="dropdown-sub-container">
        {filterOption.children.map(child => (
          <button
            className="dropdown-options"
            key={child.id}
            onClick={() => this.props.handleOnChangeFilterOptions(child.name, 'category')}
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
          this.state.subDropdownOpen ? (
            'dropdown-container dropdown-container-expand'
          ) : (
            'dropdown-container dropdown-container-collapse'
          )
        }
      >
        <div
          className={
            this.state.subDropdownOpen ? (
              'dropdown-btn-half'
            ) : (
              'dropdown-btn-full'
            )
          }
        >
          {this.props.filterOptions.map(filterOption => (
            <button
              className="dropdown-options"
              key={filterOption.id}
              onClick={e => this._onClick(filterOption)}
              onMouseOver={e => this._toggleSubOption(e, filterOption)}
            >
              <span className="">{filterOption.name}</span>
              {filterOption.children.length > 0 && (
                <MdKeyboardArrowRight
                  className="dropdown-options-icon"
                  size="20"
                />
              )}
            </button>
          ))}
        </div>
        {this.state.selectedfilterOption &&
          this._renderSubOptions(this.state.selectedfilterOption)}
      </div>
    );
  }
  render() {
    return (
      <div className="col-md-3 col-xs-3 noPadding filterSelectContainer text-xs-margin">
        <button
          className="dropdown-btn filterSelect"
          onClick={() => this._toggleDropdownOptions()}
        >
          {this.props.filterName}
        </button>
        <FaSortDesc className="filterSelect_icon" size={14} color={'#fff'} />
        {this.state.dropdownOpen && this._renderOptions()}
      </div>
    );
  }
}

FilterByOptions.propTypes = {
  filterName: PropTypes.string.isRequired,
  filterOptions: PropTypes.array.isRequired,
  handleOnChangeFilterOptions: PropTypes.func,
};
export default onClickOutside(FilterByOptions);

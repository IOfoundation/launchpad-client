import React from 'react';
import {PropTypes} from 'prop-types';
import {FaSortDesc} from 'react-icons/lib/fa';
import onClickOutside from 'react-onclickoutside';
import {MdKeyboardArrowRight} from 'react-icons/lib/md';
import {MdClose} from 'react-icons/lib/md';

class FilterByOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
      showSubOptions: false
    };
  }
  _toggleOptions() {
    this.setState({showOptions: !this.state.showOptions});
  }
  _toggleSubOption() {
    this.setState({showSubOptions: true});
  }
  handleClickOutside() {
    this.setState({showOptions: false});
    this.setState({showSubOptions: false});
  }
  _renderSubOptions() {
    return (
      <div className="dropdown-sub-container">
        <button className="dropdown-options"><span className="">{'option'}</span></button>
      </div>
    );
  }
  _renderOptions() {
    return (
      <div
        className={
          this.state.showSubOptions
          ? 'dropdown-container dropdown-container-expand'
          : 'dropdown-container dropdown-container-collapse'
        }
      >
      <div className={
          this.state.showSubOptions
          ? 'dropdown-btn-half'
          : 'dropdown-btn-full'
        }>
        {this.props.filterOptions.map(filterOption => (
            <button
              className="dropdown-options"
              key={filterOption.id}
              onClick={() => this._toggleSubOption()}
            >
              <span className="">{filterOption.name}</span>
              <MdKeyboardArrowRight className="dropdown-options-icon" size="20" />
            </button>
        ))}
      </div>
        {this.state.showSubOptions ? this._renderSubOptions() : null}
      </div>
    );
  }
  render() {
    return (
      <div className="col-md-3 col-xs-10 noPadding filterSelectContainer text-xs-margin">
        <button
          className="dropdown-btn filterSelect"
          onClick={() => this._toggleOptions()}
        >
          {this.props.filterName}
        </button>
        <FaSortDesc className="filterSelect_icon" size={14} color={'#fff'} />
        {this.state.showOptions ? this._renderOptions() : null}
      </div>
    );
  }
}

FilterByOptions.propTypes = {
  filterMultiple: PropTypes.bool,
  filterName: PropTypes.string.isRequired,
  filterOptions: PropTypes.array.isRequired,
  handleOnChangeFilterOptions: PropTypes.func,
};

export default onClickOutside(FilterByOptions);

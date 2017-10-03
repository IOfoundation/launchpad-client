import React from 'react';
import {PropTypes} from 'prop-types';
import CheckBox from '../shared/CheckBox';
import {FaSortDesc} from 'react-icons/lib/fa';
import onClickOutside from 'react-onclickoutside';
import {MdKeyboardArrowRight} from 'react-icons/lib/md';

class FilterByOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
    };
  }
  _toggleOptions() {
    this.setState({showOptions: !this.state.showOptions});
  }
  handleClickOutside() {
    this.setState({showOptions: false});
  }
  _renderOptions() {
    let checkbox = null;
    checkbox = <CheckBox size={16} />;

    return (
      <div className="filterSelect_dropdown">
        <p className="filterSelect_dropdown_title">
          {this.props.filterName}
          <MdKeyboardArrowRight
            className="filterSelect_dropdown_icon"
            size="20"
          />
        </p>
        {this.props.filterOptions.map(filterOption => (
          <button
            className="filterSelect_option"
            key={filterOption.id}
            onClick={() =>
              this.props.handleOnChangeFilterOptions(
                filterOption.name,
                this.props.filterMultiple
              )}
          >
            {checkbox}
            <span className="filterSelect_text">{filterOption.name}</span>
            <MdKeyboardArrowRight className="btn-search-icon" size="32" />
          </button>
        ))}
        <div className="filterSelect_clear">{'Clear'}</div>
      </div>
    );
  }
  render() {
    return (
      <div className="col-md-3 col-xs-10 noPadding filterSelectContainer text-xs-margin">
        <button
          className="filterInput filterSelect"
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

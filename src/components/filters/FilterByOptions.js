import React from 'react';
import {PropTypes} from 'prop-types';
import CheckBox from '../shared/CheckBox';

class FilterByOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
    };
  }
  _handleOptionClick() {
    this.props.handleOnChangeFilterOptions(filterOption.id);
    this.setState({showOptions: true});
  }
  _toggleOptions() {
    this.setState({showOptions: !this.state.showOptions});
  }
  _renderOptions() {
    return (
      <div
        className="filterSelect_dropdown"
        onBlur={() => this._toggleOptions()}
      >
        <p className="smallFont primary filterSelect_dropdown_title">
          {this.props.filterName}
        </p>
        <button
          className={'filterSelect_option' + ' filterSelect_option--selected'}
          onClick={() => this._handleOptionClick(filterOption.id)}
        >
          <CheckBox size={16} />
          <span className="filterSelect_text">{'Option 1'}</span>

        </button>
        <button
          className="filterSelect_option"
          onClick={() =>
            this.props.handleOnChangeFilterOptions(filterOption.id)}
        >
          <CheckBox size={16} />
          <span className="filterSelect_text">{'Option 2'}</span>
        </button>

        {this.props.filterOptions.map(filterOption => (
          <button
            className="filterSelect_text"
            key={filterOption.id}
            onClick={() =>
              this.props.handleOnChangeFilterOptions(filterOption.id)}
          >
            {filterOption.name}
          </button>
        ))}
        <div className="filterSelect_clear">{'Clear'}</div>
      </div>
    );
  }
  render() {
    return (
      <div className="col-xs-2 noPadding filterSelectContainer">
        <button className="filterSelect" onClick={() => this._toggleOptions()}>
          {this.props.filterName}
        </button>
        {this.state.showOptions ? this._renderOptions() : null}
      </div>
    );
  }
}

FilterByOptions.propTypes = {
  filterName: PropTypes.string.isRequired,
  filterOptions: PropTypes.array.isRequired,
  filterType: PropTypes.string.isRequired,
  handleOnChangeFilterOptions: PropTypes.func,
};

export default FilterByOptions;

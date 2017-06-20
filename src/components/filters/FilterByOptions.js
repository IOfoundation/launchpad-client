import React from 'react';
import {PropTypes} from 'prop-types';
import CheckBox from '../shared/CheckBox';
import {FaSortDesc} from 'react-icons/lib/fa';

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
  _renderOptions() {
    let checkbox = null;
    checkbox = <CheckBox size={16} />;

    return (
      <div className="filterSelect_dropdown">
        <p className="smallFont primary filterSelect_dropdown_title">
          {this.props.filterName}
        </p>
        <button
          className="filterSelect_option"
          onClick={() => this.props.handleOnChangeFilterOptions('test', 'test')}
        >
          {checkbox}
          <span className="filterSelect_text">{'Test filter'}</span>
        </button>
        <button
          className="filterSelect_option"
          onClick={() => this.props.handleOnChangeFilterOptions('test', 'test')}
        >
          {checkbox}
          <span className="filterSelect_text">{'Test filter'}</span>
        </button>
        <button
          className="filterSelect_option"
          onClick={() => this.props.handleOnChangeFilterOptions('test', 'test')}
        >
          {checkbox}
          <span className="filterSelect_text">{'Test filter'}</span>
        </button>
        {this.props.filterOptions.map(filterOption => (
          <button
            className="filterSelect_option"
            key={filterOption.id}
            onClick={() =>
              this.props.handleOnChangeFilterOptions(
                filterOption.name,
                filterOption.id
              )}
          >
            {checkbox}
            <span className="filterSelect_text">{filterOption.name}</span>
          </button>
        ))}
        <div className="filterSelect_clear">{'Clear'}</div>
      </div>
    );
  }
  render() {
    return (
      <div
        className="col-xs-2 noPadding filterSelectContainer"
        onBlur={() => this.setState({showOptions: false})}
      >
        <button
          className="filterInput filterSelect"
          onClick={() => this._toggleOptions()}
        >
          {this.props.filterName}
        </button>
        <FaSortDesc className="filterSelect_icon" size={14} color={'#000'} />
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

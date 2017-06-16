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
  _toggleOptions() {
    this.setState({showOptions: !this.state.showOptions});
  }
  _renderOptions() {
    let checkbox = null;
    if (this.props.filterName !== 'Business Type') {
      checkbox = <CheckBox size={16} />;
    }
    return (
      <div className="filterSelect_dropdown">
        <p className="smallFont primary filterSelect_dropdown_title">
          {this.props.filterName}
        </p>
        {this.props.filterOptions.map(filterOption => (
          <button
            className="filterSelect_option"
            key={filterOption.id}
            onClick={() =>
              this.props.handleOnChangeFilterOptions(
                this.props.filterType,
                filterOption.name
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

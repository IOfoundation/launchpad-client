import React from 'react';
import {PropTypes} from 'prop-types';
import {MdSearch} from 'react-icons/lib/md';

class FilterByText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelTop: false,
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.handleTextSearchBusinesses(event.target.value);
  }
  _inputClicked() {
    this.setState({labelTop: true});
  }
  render() {
    return (
      <div className="col-md-2 col-xs-10 text-xs-margin noPadding">
        <form className="filterTextForm">
          <label
            className={
              this.state.value
                ? 'filterText_label--content'
                : 'filterText_label'
            }
          >
            {'Search for a Resource'}
          </label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onClick={() => this._inputClicked()}
            placeholder=""
            className="filterInput filterText"
          />
          <MdSearch className="filterText_icon" size={17} color={'#3F51B5'} />
        </form>
      </div>
    );
  }
}

FilterByText.propTypes = {
  handleTextSearchBusinesses: PropTypes.func.isRequired,
};

export default FilterByText;

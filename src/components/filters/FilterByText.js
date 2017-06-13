import React from 'react';
import {PropTypes} from 'prop-types';

class FilterByText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.handleTextSearchBusinesses(event.target.value);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder=""
        />
      </form>
    );
  }
}

FilterByText.propTypes = {
  handleTextSearchBusinesses: PropTypes.func.isRequired,
};

export default FilterByText;

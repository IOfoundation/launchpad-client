import React from 'react';
import {PropTypes} from 'prop-types';

class BusinessesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmitSearchBusinessesForm(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className={'businessesName'}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Find..."
        />
        <input type="submit" value="SEARCH" className={'submit'} />
      </form>
    );
  }
}

BusinessesForm.propTypes = {
  handleSubmitSearchBusinessesForm: PropTypes.func.isRequired,
};

export default BusinessesForm;

import React from 'react';
import {PropTypes} from 'prop-types';
import {MdSearch} from 'react-icons/lib/md';
import onClickOutside from 'react-onclickoutside';

class BusinessesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      showDropdown: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  showDropdown() {
    this.setState({showDropdown: !this.state.showDropdown});
  }

  handleClickOutside() {
    this.setState({showDropdown: false});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleTextSearchBusinessesForm(this.state.value);
  }

  handleKeyPress(value) {
    this.props.handleTextSearchBusinessesForm(value);
  }

  renderDropdown() {
    return (
      <ul className="hero-dropdown-list">
        {this.props.services.map(service => (
          <li>
            <a href='/businesses?category='>
              <b>{service.name}</b>
            </a>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyPress={e => this.handleKeyPress(e.target.value)}
          placeholder="Search for businesses and services"
          className="hero_input businessesName"
          onFocus={e => this.showDropdown(e)}
        />
        <MdSearch className="text-search-icon" size={40} color={'#2AD587'} />
        <div
          className={
            this.state.showDropdown ? (
              'hero_input-dropdown hero_input-show'
            ) : (
              'hero_input-dropdown hero_input-hide'
            )
          }
        >
          {this.renderDropdown()}
        </div>
      </form>
    );
  }
}

BusinessesForm.propTypes = {
  services: PropTypes.array,
  handleTextSearchBusinessesForm: PropTypes.func.isRequired,
};

export default onClickOutside(BusinessesForm);

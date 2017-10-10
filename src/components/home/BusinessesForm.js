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
    this.props.handleSubmitSearchBusinessesForm(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
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
          <ul className="hero-dropdown-list">
            <li>
              <a href="/businesses?category=Bussines%20Planning/Managment">
                {'Business Planning/Management'}
              </a>
            </li>
            <li>
              <a href="/businesses?category=Capital">{'Capital'}</a>
            </li>
            <li>
              <a href="/businesses?category=Legal%20Services">
                {'Legal Services'}
              </a>
            </li>
            <li>
              <a href="/businesses?category=Marketing/Sales">
                {'Marketing/Sales'}
              </a>
            </li>
            <li>
              <a href="/businesses?category=Physical%20Space">
                {'Physical Space'}
              </a>
            </li>
          </ul>
        </div>
      </form>
    );
  }
}

BusinessesForm.propTypes = {
  handleSubmitSearchBusinessesForm: PropTypes.func.isRequired,
};

export default onClickOutside(BusinessesForm);

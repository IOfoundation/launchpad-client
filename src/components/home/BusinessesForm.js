import React from 'react';
import {PropTypes} from 'prop-types';
import {MdSearch} from 'react-icons/lib/md';
import onClickOutside from 'react-onclickoutside';
import {isEmpty} from 'lodash';

class BusinessesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      showDropdown: false,
    };
  }

  handleClickOutside() {
    this.setState({showDropdown: false});
  }

  handleKeyPress(event) {
    const value = event.target.value;
    this.setState({searchText: value, showDropdown: true});
    this.props.getTextSearchResults(value);
    if (isEmpty(value)) {
      this.setState({showDropdown: false});
    }
  }

  renderDropdown() {
    return (
      <ul className="hero-dropdown-list">
        {this.props.items.map(item => (
          <li key={item.id}>
            <a
              href={item.searchable_type === 'Category'
                ? `/businesses?category=${item.content}`
                : `/businesses?id=${item.searchable_id}`
              }
            >
              {item.content}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.searchText}
          onChange={event => this.handleKeyPress(event)}
          placeholder="Search for businesses and services"
          className="hero_input businessesName"
        />
        <MdSearch className="text-search-icon" size={40} color={'#2AD587'} />
        <div
          className={
            this.state.showDropdown
              ? 'hero_input-dropdown hero_input-show'
              : 'hero_input-dropdown hero_input-hide'
          }
        >
          {this.renderDropdown()}
        </div>
      </form>
    );
  }
}

BusinessesForm.propTypes = {
  getTextSearchResults: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
};

export default onClickOutside(BusinessesForm);

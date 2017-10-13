import React from 'react';
import {PropTypes} from 'prop-types';
import {MdSearch} from 'react-icons/lib/md';
import onClickOutside from 'react-onclickoutside';
import {isEmpty} from 'lodash';

class BusinessesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      showDropdown: false,
    };
  }

  handleClickOutside() {
    this.setState({showDropdown: false});
  }

  handleKeyPress(value) {
    this.setState({value: event.target.value, showDropdown: true});
    this.props.handleTextSearchResults(value);
    if (isEmpty(value)) {
      this.setState({showDropdown: false});
    }
  }

  renderDropdown() {
    return (
      <ul className="hero-dropdown-list">
        {this.props.search_results.map(search_result => (
          <li key={search_result.id}>
            <a
              href={search_result.searchable_type === 'Category'
                ? `/businesses?category=${search_result.content}`
                : `/businesses?id=${search_result.searchable_id}`
              }
            >
              {search_result.content}
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
          value={this.state.value}
          onKeyUp={e => this.handleKeyPress(e.target.value)}
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
  handleTextSearchResults: PropTypes.func.isRequired,
  search_results: PropTypes.arrayOf(PropTypes.object),
};

export default onClickOutside(BusinessesForm);

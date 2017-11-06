import React from 'react';
import {PropTypes} from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import {isEmpty} from 'lodash';
import {Link} from 'react-router';

class BusinessesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      showDropdown: false,
      showPreviewDropdown: false,
    };
  }

  handleClickOutside() {
    this.setState({
      searchText: '',
      showDropdown: false,
      showPreviewDropdown: false,
    });
    const {value} = this.state;
    this.props.getTextSearchResults(value);
  }

  handleKeyPress(event) {
    const value = event.target.value;
    this.setState({
      searchText: value,
      showDropdown: true,
      showPreviewDropdown: false,
    });
    this.props.getTextSearchResults(value);
    if (isEmpty(value)) {
      this.setState({showDropdown: false});
    }
  }
  inputOnClick() {
    this.setState({showPreviewDropdown: true});
  }
  defaultDropdownOptions() {
    return (
      <ul className="hero-dropdown-list">
        <li>
          <Link to="/businesses?category=Planning/Management">
            {'Business Planning/Management'}
          </Link>
        </li>
        <li>
          <Link to="/businesses?category=Capital">{'Capital'}</Link>
        </li>
        <li>
          <Link to="/businesses?category=Legal%20Services">
            {'Legal Services'}
          </Link>
        </li>
        <li>
          <Link to="/businesses?category=Marketing/Sales">
            {'Marketing/Sales'}
          </Link>
        </li>
        <li>
          <Link to="/businesses?category=Physical%20Space">
            {'Physical Space'}
          </Link>
        </li>
      </ul>
    );
  }
  renderDropdown() {
    return (
      <div>
        <ul className={
            this.state.showPreviewDropdown
              ? 'hero-dropdown-list-hide'
              : 'hero-dropdown-list'
          }
        >
          {this.props.items.map(item => (
            <li
              key={item.id}
              className={item.searchable_type === 'Organization' ?
                'text-thin' : 'text-regular'
            }>
              <a
                href={
                  item.searchable_type === 'Category'
                    ? `/businesses?category=${item.content}`
                    : `/businesses?id=${item.searchable_id}`
                }
              >
                {item.content}
              </a>
              {item.searchable_type === 'Organization' ? (
                <img src="../static-data/images/organization.png" />
              ) : null}
            </li>
          ))}
          {this.props.items.length === 0 && (
            <li className="not-match-message">
              {'This does not match any item on our platform'}
            </li>
          )}
        </ul>
        {this.state.showPreviewDropdown ? this.defaultDropdownOptions() : null}
      </div>
    );
  }

  render() {
    return (
      <form>
        <input
          type='text'
          value={this.state.searchText}
          onChange={event => this.handleKeyPress(event)}
          onClick={() => this.inputOnClick()}
          placeholder={
            this.state.showDropdown || this.state.showPreviewDropdown
            ? ''
            : 'Search for businesses or services'
          }
          className="hero_input businessesName text-thin"
        />
        <img
          className="text-search-icon"
          src="/static-data/images/search.png"
        />
        <div
          className={
            this.state.showDropdown || this.state.showPreviewDropdown
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

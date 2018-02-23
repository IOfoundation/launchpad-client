import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import {isEmpty, last} from 'lodash';
import {Link} from 'react-router';

class BusinessesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      showDropdown: false,
      showPreviewDropdown: false,
      actualSelectedItem: null,
      currentIndex: null,
      keyPress: false,
    };
    this.defaultList = null;
    this.resultsListHTML = null;
    this._formOnKeyDown = this._formOnKeyDown.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
    this._fromNodeListToArray = this._fromNodeListToArray.bind(this);
    this._move = this._move.bind(this);
    this.noop = this.noop.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
  }

  noop() {}

  _onMouseMove() {
    this.setState({keyPress: false});
  }

  _formOnKeyDown(event) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (this.state.actualSelectedItem) {
          this.state.actualSelectedItem.firstChild.click();
        }
        break;
      case 'ArrowUp':
        this._move('up');
        break;
      case 'ArrowDown':
        this._move('down');
        break;
      default:
        break;
    }
  }

  _fromNodeListToArray(nodeList) {
    this.resultsListHTML = nodeList;
    this.defaultList = nodeList && [...nodeList.childNodes];
  }

  _move(action) {
    this._fromNodeListToArray(this.defaultList);
    const index = this.state.currentIndex;
    const elem = this.state.actualSelectedItem;
    let newIndex = null;
    let newElem = null;

    switch (action) {
      case 'up':
        if (index != null && elem != null) {
          newIndex = index - 1;
          if (newIndex < 0) {
            newIndex = this.defaultList.length - 1;
          }
          newElem = this.defaultList[newIndex];
        } else {
          newIndex = this.defaultList.length - 1;
          newElem = last(this.defaultList);
        }
        break;
      case 'down':
        if (index != null && elem != null) {
          newIndex = index + 1;
          if (newIndex > this.defaultList.length - 1) {
            newIndex = 0;
          }
          newElem = this.defaultList[newIndex];
        } else {
          newIndex = 0;
          newElem = this.defaultList[newIndex];
        }
        break;
      default:
        break;
    }

    if (newElem) {
      this.resultsListHTML.scrollTo(0, newElem.offsetTop);
    }

    this.setState({
      actualSelectedItem: newElem,
      currentIndex: newIndex,
      keyPress: true,
    });
  }

  _onMouseOver(e) {
    let elemLi;
    this._fromNodeListToArray(this.defaultList);
    if (e.target.tagName.toLowerCase() === 'a') {
      elemLi = e.target.parentElement;
    } else {
      elemLi = e.target;
    }
    const index = this.defaultList.findIndex(
      elem => elem.value === elemLi.value
    );
    this.setState({actualSelectedItem: elemLi, currentIndex: index});
  }

  _getLiClassName(item) {
    let className = '';
    className +=
      this.state.actualSelectedItem &&
      this.state.actualSelectedItem.value === item.id
        ? 'highlight-element '
        : '';
    className +=
      item.searchable_type === 'Organization' ? 'text-thin' : 'text-regular';
    return className;
  }

  handleClickOutside() {
    this.setState({
      searchText: '',
      showDropdown: false,
      showPreviewDropdown: false,
      actualSelectedItem: null,
      currentIndex: null,
    });
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
  inputOnClick(input = true) {
    const boolean = input ? true : !this.state.showPreviewDropdown;
    this.setState({showPreviewDropdown: boolean, showDropdown: boolean});
  }
  defaultDropdownOptions() {
    return (
      <ul
        className="hero-dropdown-list"
        ref={list => {
          this.defaultList = list;
        }}
      >
        <li
          value="1"
          onMouseOver={this.state.keyPress ? this.noop : this._onMouseOver}
          className={
            this.state.actualSelectedItem &&
            this.state.actualSelectedItem.value === 1
              ? 'highlight-element'
              : ''
          }
        >
          <Link to="/businesses?category=Planning/Management">
            {'Business Planning/Management'}
          </Link>
        </li>
        <li
          value="2"
          onMouseOver={this.state.keyPress ? this.noop : this._onMouseOver}
          className={
            this.state.actualSelectedItem &&
            this.state.actualSelectedItem.value === 2
              ? 'highlight-element'
              : ''
          }
        >
          <Link to="/businesses?category=Capital">{'Capital'}</Link>
        </li>
        <li
          value="3"
          onMouseOver={this.state.keyPress ? this.noop : this._onMouseOver}
          className={
            this.state.actualSelectedItem &&
            this.state.actualSelectedItem.value === 3
              ? 'highlight-element'
              : ''
          }
        >
          <Link to="/businesses?category=Legal%20Services">
            {'Legal Services'}
          </Link>
        </li>
        <li
          value="4"
          onMouseOver={this.state.keyPress ? this.noop : this._onMouseOver}
          className={
            this.state.actualSelectedItem &&
            this.state.actualSelectedItem.value === 4
              ? 'highlight-element'
              : ''
          }
        >
          <Link to="/businesses?category=Marketing/Sales">
            {'Marketing/Sales'}
          </Link>
        </li>
        <li
          value="5"
          onMouseOver={this.state.keyPress ? this.noop : this._onMouseOver}
          className={
            this.state.actualSelectedItem &&
            this.state.actualSelectedItem.value === 5
              ? 'highlight-element'
              : ''
          }
        >
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
        <ul
          className={
            this.state.showPreviewDropdown
              ? 'hero-dropdown-list-hide'
              : 'hero-dropdown-list scroll-list'
          }
          ref={list => {
            this.defaultList = list;
          }}
        >
          {this.props.items.map(item => (
            <li
              key={item.id}
              value={item.id}
              className={this._getLiClassName(item)}
              onMouseOver={this.state.keyPress ? this.noop : this._onMouseOver}
            >
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
      <form onKeyDown={this._formOnKeyDown} onMouseMove={this._onMouseMove}>
        <input
          type="text"
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
          onClick={() => this.inputOnClick(false)}
          className="text-search-icon"
          src="/static-data/images/Dropdown-arrow.svg"
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

import React from 'react';
import {PropTypes} from 'prop-types';
import {MdSearch} from 'react-icons/lib/md';
import {MdClear} from 'react-icons/lib/md';

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
  _closeSearch() {
    this.setState({labelTop: false});
    this.setState({value: ''});
  }
  render() {
    return (
      <div className="col-md-12 col-xs-12 text-xs-margin m-bot-16 filterTextContainer noPadding">
        <form className="grid filterTextForm">
          <h3
            className={
              this.state.labelTop ? (
                'col-lg-8 hide-filter'
              ) : (
                'show-filter col-lg-8'
              )
            }
          >
            Filter results with the selections below
          </h3>

          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onClick={() => this._inputClicked()}
            placeholder={
              this.state.labelTop ? (
                'Search by Resource Name or Ipsum'
              ) : (
                'Or search by name'
              )
            }
            className={
              this.state.labelTop ? (
                'full-width-search'
              ) : (
                'text-search small-width-search col-md-4'
              )
            }
          />
          {this.state.labelTop && (
            <MdClear
              className="text-search-icon"
              size="32"
              color="#2AD587"
              onClick={() => this._closeSearch()}
            />
          )}
          {!this.state.labelTop && (
            <MdSearch className="text-search-icon" size="32" color="#2AD587" />
          )}
        </form>
      </div>
    );
  }
}

FilterByText.propTypes = {
  handleTextSearchBusinesses: PropTypes.func.isRequired,
};

export default FilterByText;

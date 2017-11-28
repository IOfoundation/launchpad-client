import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {isEmpty, isString} from 'lodash';
import Chip from '../shared/Chip';

class TagsBox extends PureComponent {
  render() {
    const filters = this.props.filters;
    return (
      <div>
        {isString(filters.category) && (
          <Chip
            key={filters.category}
            text={filters.category}
            handleClick={this.props.deleteFilter}
            canDelete={true}
          />
        )}
        {!isEmpty(filters.category) && !isString(filters.category) ?
          filters.category.map(filter => (
            <Chip
              key={filter}
              text={filter}
              handleClick={this.props.deleteFilter}
              canDelete={true}
            />
          ))
        : ''}
        {filters.category && (
          <a
            className="search-filter-clear text-thin"
            onClick={this.props.clearAll}
          >
            <span>{'Clear All'}</span>
          </a>
        )}
      </div>
    );
  }
}
TagsBox.propTypes = {
  clearAll: PropTypes.func.isRequired,
  deleteFilter: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

export default TagsBox;

import React from 'react';
import {PropTypes} from 'prop-types';
import {isEmpty, isString} from 'lodash';
import Chip from '../shared/Chip';

const TagsBox = ({filters, clearAll, deleteFilter}) => {
  return (
    <div>
      {isString(filters.category) && (
        <Chip
          key={filters.category}
          text={filters.category}
          handleClick={deleteFilter}
          canDelete={true}
        />
      )}
      {!isEmpty(filters.category) && !isString(filters.category)
        ? filters.category.map(filter => (
            <Chip
              key={filter}
              text={filter}
              handleClick={deleteFilter}
              canDelete={true}
            />
          ))
        : ''}
      {filters.category && (
        <a className="search-filter-clear text-thin" onClick={clearAll}>
          <span>{'Clear All'}</span>
        </a>
      )}
    </div>
  );
};

TagsBox.propTypes = {
  clearAll: PropTypes.func.isRequired,
  deleteFilter: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

export default TagsBox;

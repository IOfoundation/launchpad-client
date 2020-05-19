import React from 'react';
import {PropTypes} from 'prop-types';

import Item from './Item';

const Items = props => {
  const {items, optionSelected} = props;

  return (
    <div>
      {items.map(item => (
        <Item
          key={item.id}
          category={item.category}
          date={item.date}
          description={item.description}
          label={item.label}
          title={item.title}
          optionSelected={option => optionSelected({option, id: item.id})}
        />
      ))}
    </div>
  );
};

Items.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      date: PropTypes.string,
      description: PropTypes.string,
      label: PropTypes.string,
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ),
  optionSelected: PropTypes.func,
};

export default Items;

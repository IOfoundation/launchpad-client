import React from 'react';
import {PropTypes} from 'prop-types';

import Item from './Item';

const Items = props => {
  const {items} = props;

  return (
    <div>
      {items.map(item => (
        <Item key={item.id} {...item} />
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
      url: PropTypes.string,
      start: PropTypes.string,
    })
  ),
};

export default Items;

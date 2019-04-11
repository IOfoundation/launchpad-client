import React from 'react';
import {PropTypes} from 'prop-types';

import Item from './Item';

const Items = props => {
  const {items, disable, titleClicked, urlClicked} = props;

  return (
    <div>
      {items.map(item => (
        <Item
          key={item.id}
          disable={disable}
          {...item}
          titleClicked={() => titleClicked(item)}
          urlClicked={() => urlClicked(item)}
        />
      ))}
    </div>
  );
};

Items.propTypes = {
  disable: PropTypes.bool,
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
  titleClicked: PropTypes.func,
  urlClicked: PropTypes.func,
};

export default Items;

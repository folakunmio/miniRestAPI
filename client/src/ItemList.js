import React from 'react';
import Item from './Item';

function ItemList({ items }) {
  if (!items.length) {
    return <div className="empty-list">No items found.</div>;
  }
  return (
    <div className="item-list">
      {items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ItemList;
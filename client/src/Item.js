import React from 'react';

function Item({ item }) {
  return (
    <div className="item">
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </div>
  );
}

export default Item;
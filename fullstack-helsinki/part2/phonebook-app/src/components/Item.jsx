import React from "react";

const Item = ({ name, number, deleteMe, id }) => {
  const handleClick = e => {
    deleteMe(id);
  };
  return (
    <li>
      {name} {number} <button onClick={handleClick}>delete</button>
    </li>
  );
};

export default Item;

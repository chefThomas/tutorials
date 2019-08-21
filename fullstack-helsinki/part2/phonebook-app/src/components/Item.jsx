import React from "react";

const Item = ({ name, number, deleteMe, id }) => {
  const handleClick = e => {
    console.log("delete handle");
    deleteMe(id);
  };
  return (
    <li id={id}>
      {name} {number} <button onClick={handleClick}>delete</button>
    </li>
  );
};

export default Item;

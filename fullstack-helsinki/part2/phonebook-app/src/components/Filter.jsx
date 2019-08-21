import React from "react";

const Filter = ({ filter }) => {
  const handleChange = e => {
    filter(e.target.value);
  };
  return (
    <div>
      filter:
      <input type="text" onChange={handleChange} />
    </div>
  );
};

export default Filter;

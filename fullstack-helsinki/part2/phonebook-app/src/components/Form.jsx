import React from "react";

const Form = ({
  onSubmit,
  onNameChange,
  onNumberChange,
  numberValue,
  nameValue
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={onNameChange} value={nameValue} />
      </div>
      <div>
        number: <input onChange={onNumberChange} value={numberValue} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;

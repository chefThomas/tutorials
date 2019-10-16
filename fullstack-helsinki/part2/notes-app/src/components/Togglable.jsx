import React, { useState } from "react";

const Togglable = props => {
  const [visible, setVisible] = useState(false);

  const hide = { display: "none" };
  const show = { display: "block" };

  const toggleDisplay = () => {
    setVisible(!visible);
  };

  const cancelButtonDisplay = () => {
    return props.user || !visible ? hide : show;
  };
  return (
    <div>
      <div style={visible ? show : hide}>{props.children}</div>
      <button style={visible ? hide : show} onClick={toggleDisplay}>
        {props.label}
      </button>
      <button style={cancelButtonDisplay()} onClick={toggleDisplay}>
        cancel
      </button>
    </div>
  );
};

export { Togglable };

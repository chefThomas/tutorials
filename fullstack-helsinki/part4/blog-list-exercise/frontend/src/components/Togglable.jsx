import React, { useState } from "react";

const Togglable = ({ user, children }) => {
  const [hideChild, setHideChild] = useState(false);
  const Style = {
    hide: {
      display: "none"
    },
    show: {
      display: "block"
    }
  };

  const handleHideChild = () => {
    setHideChild(!hideChild);
  };

  const setButtonLabel = () => (!user && !hideChild ? "cancel" : "login");

  return (
    <div style={user ? Style.hide : Style.show}>
      <div style={!user && !hideChild ? Style.show : Style.hide}>
        {children}
        <br></br>
      </div>
      <button onClick={handleHideChild}>{setButtonLabel()}</button>
    </div>
  );
};
export { Togglable };

import React, { useState } from "react";

// styles
import { FormStyle } from "../styles/FormStyle";
import { hide } from "../styles/hide";

const NoteForm = ({ user, handleNoteSubmit, note, handleTextInput }) => {
  const [visible, setVisible] = useState(false);

  const toggleVis = () => {
    setVisible(!visible);
  };
  return (
    <div style={user ? FormStyle : hide}>
      <form
        style={visible && user ? FormStyle : hide}
        onSubmit={handleNoteSubmit}
      >
        <input onChange={handleTextInput} type="text" value={note} />
        <input type="submit" onClick={toggleVis} />
      </form>
      <button onClick={toggleVis}>new note</button>
    </div>
  );
};

export { NoteForm };

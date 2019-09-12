import React from "react";
import "../styles/index.css";

const Note = ({ content, important, toggleImportant, id, removeNote }) => {
  const styles = {
    textDecoration: "underline"
  };

  const handleToggle = () => {
    console.log(id);
    toggleImportant(id);
  };

  const handleDelete = e => {
    removeNote(id);
  };

  return (
    <li className="Note" key={id} id={id} style={important ? styles : null}>
      <button
        className={important ? "red-button" : "button"}
        onClick={handleToggle}
      >
        {important ? "important!" : "regular note"}
      </button>
      {content} <button onClick={handleDelete}>delete</button>
    </li>
  );
};
export default Note;

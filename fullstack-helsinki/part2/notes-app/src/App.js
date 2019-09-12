import React, { useState, useEffect } from "react";
// import axios from "axios";
import Note from "./components/Note";
import { initialGet, postNew, toggle, removeNote } from "./services/api";

const App = props => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const importantNotes = notes.filter(note => note.important);

  const [note, setNote] = useState("add note");

  useEffect(() => {
    console.log("useEffect triggered this");
    initialGet()
      .then(res => {
        console.log(res);
        setNotes(res.data);
      })
      .catch(err => console.log(err.message));
  }, []);

  const handleTextInput = e => {
    setNote(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newNote = {
      content: note,
      important: Math.random() > 0.5,
      date: new Date()
    };

    // ad to db
    postNew(newNote)
      .then(res => {
        console.log("submit res.data: ", res.data);
        setNotes(notes.concat(res.data));
      })
      .catch(err => console.log("error posting new note: ", err));
  };

  const showImportant = () => {
    // only important notes displayed showAll is false
    setShowAll(!showAll);
  };

  const toggleImportant = id => {
    console.log("id in toggle: ", id);
    const note = notes.find(note => note.id === id);
    const modNote = { important: !note.important };
    toggle(id, modNote)
      .then(res => {
        console.log("res data", res.data);
        setNotes(notes.map(note => (note.id === id ? res.data : note)));
      })
      .catch(err => console.log(err));
  };

  const handleRemove = id => {
    console.log(id);
    removeNote(id)
      .then(res => {
        setNotes(notes.filter(note => note.id !== id));
      })
      .catch(err => console.log("error message ", err));
    // remove frmo state (map)
  };

  const generalRender = noteArr =>
    noteArr.map(({ content, id, important }) => (
      <Note
        content={content}
        important={important}
        toggleImportant={toggleImportant}
        id={id}
        key={id}
        removeNote={handleRemove}
      />
    ));

  return (
    <div className="App">
      <h1>Notes</h1>
      <button onClick={showImportant}>
        {showAll ? "Click to Show only important" : "Click to Show All"}
      </button>
      <form onSubmit={handleSubmit}>
        <input onChange={handleTextInput} type="text" value={note} />
        <input type="submit" />
      </form>
      <ul>{showAll ? generalRender(notes) : generalRender(importantNotes)}</ul>
    </div>
  );
};

export default App;

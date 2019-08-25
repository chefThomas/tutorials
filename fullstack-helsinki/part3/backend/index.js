const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
];

app.use(bodyParser.json());

const generateDateAndId = () => {
  // insure novel id by finding max of existing and adding 1
  return { id: Math.max(...notes.map(note => note.id)) + 1, date: new Date() };
};

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const id = req.params.id;
  const target = notes.find(note => note.id === +id);

  return target
    ? res.json(target)
    : res
        .status(404)
        .send("resource not found")
        .end();
});

app.delete("/notes/:id", (req, res) => {
  const id = +req.params.id;
  if (notes.find(note => note.id === id)) {
    notes = notes.filter(note => note.id !== id);
    res.json(notes);
  } else {
    res.status(404).send({ error: "resource not found" });
  }
});

app.post("/notes", (req, res) => {
  let note = req.body;
  console.log(note);
  const { date, id } = generateDateAndId();
  const newNote = { id, date, ...note };
  notes = notes.concat(newNote);
  res.send(newNote).end();
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

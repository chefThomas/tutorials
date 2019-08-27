const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const uuid = require("short-uuid");
let data = require("./data/fake-db");

morgan.token("body", req => JSON.stringify(req.body));

// app.use(requestLogger);
app.use(express.static("build"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
// return all
app.get("/persons", (req, res) => {
  res.json(data);
  //   res.json(persons);
});

// generate ID
const generateId = () => {
  return uuid.generate();
};

// return HTML displaying number of entries in phonebook and time of retrieval
app.get("/info", (req, res) => {
  const personsCount = data.data.persons.length;
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${personsCount} people</p><p>${date}</p>`
  );
});

// return single person
app.get("/persons/:id", (req, res) => {
  const paramId = req.params.id;
  // find person

  //find person
  const person = data.persons.find(person => person.id === paramId);
  if (!person) {
    res.status(404).send("resource not found");
  } else {
    res.json(person);
  }
});

app.delete("/persons/:id", (req, res) => {
  const paramId = req.params.id;
  const person = data.persons.find(person => person.id === paramId);
  if (!person) {
    res.status(404).send("resource not found");
  } else {
    data.persons = data.persons.filter(person => person.id !== paramId);
    res.status(202).send("resource deleted");
  }
});

app.post("/persons", (req, res) => {
  const newPerson = req.body;
  // check for existing name
  const query = data.persons.find(person => person.name == newPerson.name);

  if (query) {
    return res.status(400).send("this person already in book");
  } else {
    if (req.body.name.length === 0 || req.body.number === 0) {
      res.status(400).send("bad request. missing information");
    } else {
      newPerson.id = generateId();
      data = { ...data, persons: data.persons.concat(newPerson) };
      console.log(data);
      return res.status(202).json(newPerson);
    }
  }
});

app.put("/persons/:id", (req, res) => {
  const queryId = req.params.id;
  const person = data.persons.find(person => person.id === queryId);
  // gen updated person
  const updatedPerson = { ...person, number: req.body.number };

  // update db
  const updatedPersons = data.persons.map(person =>
    person.id !== queryId ? person : updatedPerson
  );
  data = { ...data, persons: updatedPersons };
  // return updated obj to client
  res.status(200).send(updatedPerson);
});

const unkEndpoint = (req, res, next) => {
  res.status(404).send({ error: "invalid path" });
};

app.use(unkEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

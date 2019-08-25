const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

let data = require("./data/fake-db");

// const requestLogger = (req, res, next) => {
//   console.log("Method: ", req.method);
//   console.log("Path: ", req.path);
//   console.log("Body: ", req.body);
//   console.log("----");
//   next();
// };

// middleware
morgan.token("body", req => JSON.stringify(req.body));

// app.use(requestLogger);
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
  return Math.max(...data.persons.map(person => person.id)) + 1;
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
  const person = data.persons.find(person => person.id === +paramId);
  console.log(person);
  if (!person) {
    res.status(404).send("resource not found");
  } else {
    res.json(person);
  }
});

app.delete("/persons/:id", (req, res) => {
  const paramId = +req.params.id;
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
      data.persons = data.persons.concat(newPerson);
      res.status(202).json(data);
    }
  }
  // res.status(400).send("this person is already in the phonebook");
  // return;
});

const unkEndpoint = (req, res, next) => {
  res.status(404).send({ error: "invalid path" });
};

app.use(unkEndpoint);

PORT = 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

require("dotenv").config();
const Person = require("./models/mongo");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { validationErrorHandler } = require("./middleware/errorHandling");

morgan.token("body", req => JSON.stringify(req.body));

// app.use(requestLogger);
app.use(express.static("build"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
// return all
app.get("/persons", (req, res, next) => {
  Person.find({})
    .then(people => {
      console.log(people);
      res.json(people.map(person => person.toJSON()));
    })
    .catch(err => next(err));
});

// return HTML displaying number of entries in phonebook and time of retrieval
app.get("/info", (req, res, next) => {
  const date = new Date();

  Person.find({})
    .then(people => {
      console.log(
        `<p>Phonebook has info for ${people.length} people</p><p>${date}</p>`
      );
    })
    .catch(err => next(err));
});

// return single person
app.get("/persons/:id", (req, res) => {
  // find person
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).json({ error: "person not found" });
      }
    })
    .catch(err => next(err));
});

app.delete("/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(person => {
      if (!person) {
        res.status(204).end();
      } else {
        console.log("in remove then ", person);
        res.json(person.toJSON());
      }
    })
    .catch(err => next(err));
});

app.post("/persons", (req, res, next) => {
  const newPerson = req.body;
  // check for existing name
  console.log("in post", newPerson);

  const person = new Person({
    name: req.body.name,
    number: req.body.number
  });

  person
    .save()
    .then(savedPerson => res.json(savedPerson.toJSON()))
    .catch(err => next(err));
});

app.put("/persons/:id", (req, res, next) => {
  Person.findByIdAndUpdate(
    req.params.id,
    { number: req.body.number },
    { new: true }
  )
    .then(person => {
      res.json(person.toJSON());
    })
    .catch(err => next(err));
});

const unkEndpoint = (req, res, next) => {
  res.status(404).send({ error: "invalid path" });
};
app.use(validationErrorHandler);
app.use(unkEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

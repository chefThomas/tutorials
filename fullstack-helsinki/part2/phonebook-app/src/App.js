import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Item from "./components/Item";
import Filter from "./components/Filter";

import {
  loadPersons,
  postNewPerson,
  deletePerson,
  updateNumber
} from "./services/rest";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [display, setDisplay] = useState("");

  const handleControlName = e => setNewName(e.target.value);
  const handleControlNumber = e => setNewNumber(e.target.value);

  useEffect(() => {
    loadPersons()
      .then(res => {
        console.log(res.data);
        setPersons(res.data);
      })
      .catch(err => console.log("error", err));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    // handle existing name case
    if (
      persons.some(
        person => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      if (
        window.confirm(`${newName} is already in the phonebook. Update number?`)
      ) {
        const findPerson = persons.find(
          person => person.name.toLowerCase() === newName.toLowerCase()
        );

        console.log("find person", findPerson);

        const updatedPerson = { ...findPerson, number: newNumber };

        console.log("updated person", updatedPerson.id);

        updateNumber(updatedPerson.id, updatedPerson)
          .then(res => console.log(res))
          .catch(err => console.log(err));

        setPersons(
          persons.map(person =>
            person.id !== updatedPerson.id ? person : updatedPerson
          )
        );

        setNewName("");
        setNewNumber("");
      }
    } else {
      // new entry
      const newPerson = { name: newName, number: newNumber };
      postNewPerson(newPerson).then(res => {
        console.log(res.data);
        setPersons(persons.concat(res.data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDelete = id => {
    console.log("delete ", id);

    if (window.confirm("Are you sure you want to do that?")) {
      deletePerson(id).then(res => {
        console.log(res);
        console.log(res.data);
        const removeDeleted = persons.filter(person => {
          return person.id !== +id;
        });
        setPersons(removeDeleted);
      });
    }
  };

  const generateList = arr => {
    return arr.map(person => (
      <Item
        key={person.id}
        id={person.id}
        name={person.name}
        number={person.number}
        deleteMe={handleDelete}
      />
    ));
  };

  const generateFiltered = str => {
    const filteredPersons = persons.filter(person => {
      return person.name.includes(str);
    });
    setDisplay(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Form
        onSubmit={handleSubmit}
        onNameChange={handleControlName}
        onNumberChange={handleControlNumber}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h3>Filter</h3>
      <Filter filter={generateFiltered} />
      <h2>Numbers</h2>
      <ul>{display ? generateList(display) : generateList(persons)}</ul>
    </div>
  );
};

export default App;

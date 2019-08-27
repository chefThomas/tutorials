import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Item from "./components/Item";
import Filter from "./components/Filter";
import Message from "./components/Message";

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
  const [message, setMessage] = useState("");

  const handleControlName = e => setNewName(e.target.value);
  const handleControlNumber = e => setNewNumber(e.target.value);

  useEffect(() => {
    loadPersons()
      .then(res => {
        const { persons } = res.data;
        console.log(persons);
        setPersons(persons);
      })
      .catch(err => console.log("error", err));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if (newName.length === 0 || newNumber.length === 0) {
      displayMessage("incomplete");
      return;
    }
    // handle existing name case
    const person = persons.find(person => person.name === newName);
    if (
      person &&
      window.confirm(`${newName} is already in the phonebook. Update number?`)
    ) {
      const updatedPerson = { ...person, number: newNumber };
      console.log("updated person obj: ", updatedPerson);
      updateNumber(person.id, updatedPerson)
        .then(res => {
          console.log("in update numb", res.data);
          setPersons(
            persons.map(person =>
              person.id !== updatedPerson.id ? person : res.data
            )
          );
          displayMessage("update");
          //reset form
          setNewName("");
          setNewNumber("");
        })
        .catch(err => console.log("updated person catch: ", err));
      // handle new name entry case
    } else {
      const newPerson = { name: newName, number: newNumber };
      postNewPerson(newPerson).then(res => {
        console.log("res.data in postNewPerson: ", res.data);
        setPersons(persons.concat(res.data));
        console.log("persons state in postNewPerson: ", persons);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDelete = id => {
    console.log("delete ", id);

    if (window.confirm("Are you sure you want to do that?")) {
      deletePerson(id)
        .then(res => {
          console.log(res);
          console.log(res.data);
          setPersons(persons.filter(person => person.id !== id));
          displayMessage("delete");
        })
        .catch(err => {
          console.log(err);
          displayMessage("already deleted");
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

  const displayMessage = type => {
    switch (type) {
      case "update":
        setMessage("entry updated");
        break;
      case "delete":
        setMessage("entry deleted");
        break;
      case "already deleted":
        setMessage(
          "this entry has already been deleted. refresh page to update"
        );
        break;
      case "incomplete":
        setMessage("You must enter both name and number");
        break;
      default:
        setMessage("");
    }

    setTimeout(() => {
      setMessage("");
    }, 1500);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div style={{ height: "1rem", marginBottom: "0.5rem" }} />
      <Form
        onSubmit={handleSubmit}
        onNameChange={handleControlName}
        onNumberChange={handleControlNumber}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h3>Filter</h3>
      <Filter filter={generateFiltered} />
      <h2>Numbers</h2> {message.length > 1 ? <Message message={message} /> : ""}
      <ul>{display ? generateList(display) : generateList(persons)}</ul>
    </div>
  );
};

export default App;

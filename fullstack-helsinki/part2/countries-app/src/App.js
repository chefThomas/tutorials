import React, { useState, useEffect } from "react";
import axios from "axios";

import Display from "./components/Display";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [display, setDisplay] = useState([...countries]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        console.log(res.data);
        setCountries(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = e => {
    // filter for countries that include e.target.value
    const searchTerm = e.target.value;
    const results = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplay(results);
  };

  return (
    <>
      find countries
      <input onChange={handleChange} type="text" />
      <Display countries={display} />
    </>
  );
};
export default App;

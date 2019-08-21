import React from "react";
import SingleCountry from "./SingleCountry";

const Display = ({ countries }) => {
  const renderResults = () => {
    if (countries.length > 9) {
      return "Too many matches to show";
    }

    // when single result expand to include more information
    if (countries.length === 1) {
      const country = countries[0];
      return (
        <div>
          <h2>{country.name}</h2>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h3>languages</h3>
          <ul>
            {country.languages.map(language => (
              <li>{language.name}</li>
            ))}
          </ul>
          <div>
            <img
              style={{ width: "200px", height: "auto" }}
              src={country.flag}
              alt="flag"
            />
          </div>
        </div>
      );
    } else {
      return countries.map(country => {
        return <SingleCountry data={country} />;
      });
    }
  };
  return <div>{renderResults()}</div>;
};

export default Display;

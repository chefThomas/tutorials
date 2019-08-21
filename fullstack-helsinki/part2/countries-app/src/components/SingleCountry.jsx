import React, { useState } from "react";

const SingleCountry = ({ data }) => {
  const [show, setShow] = useState(false);

  console.log("single country ", data);
  return (
    <div>
      {data.name} <button onClick={() => setShow(!show)}>show</button>
      {show ? (
        <>
          {" "}
          <p>capital {data.capital}</p>
          <p>population {data.population}</p>
          <h3>languages</h3>
          <ul>
            {data.languages.map(language => (
              <li>{language.name}</li>
            ))}
          </ul>
          <div>
            <img
              style={{ width: "200px", height: "auto" }}
              src={data.flag}
              alt="flag"
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SingleCountry;

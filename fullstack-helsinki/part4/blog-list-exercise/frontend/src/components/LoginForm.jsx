import React from "react";

const LoginForm = ({
  handleLogin,
  handleUsername,
  username,
  handlePassword,
  password
}) => {
  return (
    <form onSubmit={handleLogin}>
      username
      <input type="text" onChange={handleUsername} value={username}></input>
      <br />
      <br />
      password
      <input type="text" onChange={handlePassword} value={password}></input>
      <br />
      <input type="submit" />
    </form>
  );
};

export { LoginForm };

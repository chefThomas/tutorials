import React from "react";

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  username,
  handlePasswordChange,
  password,
  user
}) => {
  const hide = { display: "none" };
  const show = { display: "block" };
  return (
    <form style={user ? hide : show} onSubmit={handleLogin}>
      username
      <input
        onChange={handleUsernameChange}
        value={username}
        type="text"
      ></input>
      <br />
      password
      <input
        onChange={handlePasswordChange}
        value={password}
        type="text"
      ></input>
      <br />
      <br />
      <input type="submit" value={"login"} />
    </form>
  );
};

export { LoginForm };

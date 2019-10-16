import axios from "axios";
const baseUrl = "http://localhost:3001/login";

const login = (username, password) => {
  return axios.post(baseUrl, { username, password });
};

export { login };

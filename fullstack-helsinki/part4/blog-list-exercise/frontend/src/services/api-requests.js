import axios from "axios";
const baseUrl = "http://localhost:3003/api";

const login = async (username, password) => {
  const results = await axios.post(`${baseUrl}/login`, { username, password });
  console.log("login results", results);
  return results;
};

const getBlogs = tokenStr => {
  const token = `bearer ${tokenStr}`;
  const config = {
    headers: { Authorization: token }
  };
  console.log(token);
  return axios.get(`${baseUrl}/blogs`, config);
};

const postBlog = async (tokenStr, newBlog) => {
  const token = `bearer ${tokenStr}`;
  console.log("post blog api helper token: ", tokenStr);
  const config = {
    headers: { Authorization: token }
  };
  const result = await axios.post(`${baseUrl}/blogs`, newBlog, config);

  return result;
};

const removeBlog = async blogId => {
  const result = await axios.delete(`${baseUrl}/blogs/${blogId}`);

  console.log("remove result", result);
  return result;
};

const voteUp = (id, updatedBlog) => {
  return axios.put(`${baseUrl}/blogs/${id}`, updatedBlog);
};

export { login, getBlogs, postBlog, removeBlog, voteUp };

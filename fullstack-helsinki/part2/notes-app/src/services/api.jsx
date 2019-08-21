import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const initialGet = () => axios.get(baseUrl);

const postNew = obj => axios.post(baseUrl, obj);

const toggle = (id, obj) => axios.put(`${baseUrl}/${id}`, obj);
const removeNote = id => axios.delete(`${baseUrl}/${id}`);

export { initialGet, postNew, toggle, removeNote };

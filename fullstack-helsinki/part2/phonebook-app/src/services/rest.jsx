import axios from "axios";

const baseUrl = "http://localhost:3001/persons";
const loadPersons = () => axios.get(baseUrl);
const postNewPerson = obj => axios.post(baseUrl, obj);
const deletePerson = id => axios.delete(`${baseUrl}/${id}`);
const updateNumber = (id, obj) => axios.put(`${baseUrl}/${id}`, obj);

export { loadPersons, postNewPerson, deletePerson, updateNumber };

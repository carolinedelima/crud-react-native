import axios from "axios";

const api = axios.create({
  baseURL: "http://professornilson.com/testeservico/"
});

export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "https://abelhas-deploy.herokuapp.com",
});

export default api;

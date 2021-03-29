import axios from "axios";

const apiUrl = process.env.API_URL

const api = axios.create({
  baseURL: apiUrl,
});

export default api;

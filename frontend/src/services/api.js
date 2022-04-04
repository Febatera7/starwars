import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_PATH
});

export default api;

import Axios from 'axios';
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';
const api = Axios.create({
    baseURL:API_BASE_URL
})

export default api;
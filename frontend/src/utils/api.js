import Axios from 'axios';
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080/EP';
let token = localStorage.getItem("token")
const api = Axios.create({
    baseURL:API_BASE_URL,
    headers: { 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods" : "POST, GET, OPTIONS, PUT, DELETE", "Accept": "application/json" }
})

export default api;
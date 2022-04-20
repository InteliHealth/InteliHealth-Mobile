import axios from 'axios';

const api = axios.create({
    baseURL: 'http://apiintelihealth.azurewebsites.net/api'
})

export default api;
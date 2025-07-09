import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8004' // Usando o serviço de banco de dados
});

export default api;
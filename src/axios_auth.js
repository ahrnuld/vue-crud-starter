import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:8443/'
});

instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export default instance;
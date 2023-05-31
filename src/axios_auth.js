import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:8443/'
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

export default instance;
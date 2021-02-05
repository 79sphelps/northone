import axios from 'axios';

export default axios.create({
    // baseURL: 'http://localhost:8080',
    // baseURL: 'http://localhost:8080/api',
    // baseURL: 'https://northone-todos.herokuapp.com/api',
    baseURL: '',
    // baseURL: 'https://northone-todos.herokuapp.com',
    headers: {
        'Content-Type': 'application/json'
    }
});
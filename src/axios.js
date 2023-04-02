import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4445' ,
})

export default instance
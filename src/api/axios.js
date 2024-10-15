import axios from 'axios';
const BASE_URL = 'https://trackingberkas-abcedvfqa7fqesc5.southeastasia-01.azurewebsites.net';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
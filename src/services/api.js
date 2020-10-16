import axios from 'axios';

const api = axios.create({
    baseURL: "https://marcelorossini-com-br.umbler.net/",
    timeout: 60000,
});
export default api;
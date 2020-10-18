import axios from "axios";
import https from "https";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 60000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
export default api;

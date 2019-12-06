import axios from 'axios';
import server from './currentServer.js';

export default axios.create({
  baseURL: server,
  timeout: 10000,
});


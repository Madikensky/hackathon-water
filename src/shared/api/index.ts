import axios from 'axios';

const BASE_API_URL = 'http://195.49.212.234:8089/api/admin/';

export const backendApiInstance = axios.create({
  baseURL: BASE_API_URL,
});

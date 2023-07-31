import axios from 'axios';

let baseURL = process.env.AXIOS_BASE_URL;

export const api = axios.create({
	baseURL,
});

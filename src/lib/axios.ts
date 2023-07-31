import axios from 'axios';

let baseURL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL;

export const api = axios.create({
	baseURL,
});

import axios from 'axios';



// Konfigurasi default Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});



const apiService = {
  getData: (endpoint: string, params = {}) => api.get(endpoint, { params }),
  postData: (endpoint: string, data: any) => api.post(endpoint, data),
};

export default apiService;

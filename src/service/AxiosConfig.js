import axios from 'axios'

const getToken = () => localStorage.getItem("jwt_token")
  ? localStorage.getItem("jwt_token")
  : null;

const getAuthorizationHeader = () => `Bearer ${getToken()}`;

// Marvel axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_MARVEL_BACK_API_URL + process.env.REACT_APP_MARVEL_BACK_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = getAuthorizationHeader();

  return config;
})

export default axiosInstance;
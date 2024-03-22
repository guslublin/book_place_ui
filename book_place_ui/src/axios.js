// axios.js

import axios from 'axios';
import createCsrfTokenInterceptor from 'axios-csrf-token-interceptor';

// Configura Axios con el interceptor de token CSRF
const axiosInstance = axios.create();
const csrfTokenInterceptor = createCsrfTokenInterceptor(axiosInstance);
axiosInstance.interceptors.request.use(csrfTokenInterceptor);

export default axiosInstance;

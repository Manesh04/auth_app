import axios from 'axios';
import useAuth from '@/auth/store';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8083/api/v1",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});


// every request attach the token
apiClient.interceptors.request.use((config)=> {

  const accessToken = useAuth.getState().accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
    if(accessToken){{
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
})

export default apiClient;
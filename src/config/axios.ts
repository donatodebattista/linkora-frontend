//Configuracion de Axios para reutilizar url base
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})


//Interceptor para agregar el token de autenticación a las peticiones
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api
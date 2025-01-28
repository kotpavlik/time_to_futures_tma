import axios from "axios";



export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BACK,
    withCredentials: true,

});

instance.interceptors.request.use(
    (config) => {
        const token = import.meta.env.VITE_TON_TOKEN
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)


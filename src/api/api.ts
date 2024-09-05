import axios from "axios";

// 'https://neko-back.herokuapp.com/2.0/',
//process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : process.env.REACT_APP_BACK_URL,


export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BACK,
    withCredentials: true

})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

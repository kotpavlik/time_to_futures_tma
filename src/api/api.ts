import axios from "axios";



export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BACK,
    withCredentials: true,
})

export const walletDataInstance = axios.create({
    baseURL: import.meta.env.VITE_TONAPI,
    withCredentials: true,
})

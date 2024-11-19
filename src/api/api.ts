import axios from "axios";



export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BACK,
    withCredentials: true,
})

export const coinmarcetapp_instance = axios.create({
    baseURL: import.meta.env.VITE_COIN_MARCET_CUP_URL,
    headers: {
        'X-CMC_PRO_API_KEY': import.meta.env.VITE_COIN_MARKET_CUP_API_KEY,
    },
    withCredentials: true,
})
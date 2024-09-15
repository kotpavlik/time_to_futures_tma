import axios, { AxiosError } from "axios";
import { useAppStore } from "../zustand/app_store/AppStore";

export const HandleError = (err: Error | AxiosError) => {
    const { setError } = useAppStore.getState()

    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
        setError(error)
    } else {
        setError(`Native error ${err.message}`)
    }
}
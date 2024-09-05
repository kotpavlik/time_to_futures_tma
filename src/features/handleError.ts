import axios, { AxiosError } from "axios";
import { useAppStore } from "../zustand/app_store/AppStore";

export const HandleError = (err: Error | AxiosError) => {

    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
        const appStore = useAppStore();
        appStore().setError(error)
    } else {
        const appStore = useAppStore();
        appStore().setError(`Native error ${err.message}`)
    }
}
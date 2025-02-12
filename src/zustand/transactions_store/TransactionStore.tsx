import { AxiosError } from "axios";
import { createWithSignal } from "solid-zustand";
import { immer } from "zustand/middleware/immer";
import { HandleError } from "../../features/handleError";
import { useAppStore } from "../app_store/AppStore";
import { SendTransactionRequest, TonConnectUI } from "@tonconnect/ui";
import { TonApiClient, Event } from "@ton-api/client";


const ta = new TonApiClient({
    baseUrl: import.meta.env.VITE_TONAPI,
    apiKey: import.meta.env.VITE_TON_API_KEY
});

type TrasactionsType = {
    sendTransactions: (trx: SendTransactionRequest, tonConnectUI: () => TonConnectUI) => void
}

export const useTransactions = createWithSignal<TrasactionsType>()(immer((set, get) => ({
    sendTransactions: async (trx: SendTransactionRequest, tonConnectUI: () => TonConnectUI) => {
        const { setStatus, setError } = useAppStore.getState()

        try {
            setStatus('loading')
            const resault = await tonConnectUI().sendTransaction(trx)
            setStatus('success')

        } catch (error) {

            const err = error as Error | AxiosError
            HandleError(err)

        }

    }
})))
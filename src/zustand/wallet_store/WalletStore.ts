import { createWithSignal } from "solid-zustand";
import { immer } from "zustand/middleware/immer";
import { HandleError } from "../../features/handleError";
import { AxiosError } from "axios";
import { useAppStore } from "../app_store/AppStore";
import { walletApi } from "../../api/wallet_api/WalletApi";

export type JettonType = {
    address: string
    decimals: number
    image: string
    name: string
    symbol: string
    verification: string
}

export type WalletAddressTypre = {
    address: string
    is_scam: boolean
    is_wallet: boolean
}

export type BalanceType = {
    balance: string
    jetton: JettonType
    wallet_address: WalletAddressTypre
}

export type WalletStoreType = {
    wallet_address: string
    balances: BalanceType[]
    getJettonsData: (wallet_address: string) => void
}

export const useWalletStore = createWithSignal<WalletStoreType>()(immer((set, get) => ({
    wallet_address: '',
    balances: [],
    getJettonsData: async (wallet_address: string) => {
        const { setStatus, setError } = useAppStore.getState()
        try {
            setStatus("loading")
            const { balances }: any = await walletApi.getJettons(wallet_address)
            if (balances && wallet_address) {
                set((state) => {
                    state.wallet_address = wallet_address,
                        state.balances = balances
                })
                console.log(balances)
            }
            setStatus("success")
        } catch (error) {
            const err = error as Error | AxiosError
            HandleError(err)
            setStatus("failed")
        }
    }
})))
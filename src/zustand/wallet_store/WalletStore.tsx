import { TonApiClient } from "@ton-api/client";
import { AxiosError } from "axios";
import { createWithSignal } from "solid-zustand";
import { immer } from "zustand/middleware/immer";
import { useAppStore } from "../app_store/AppStore";
import { HandleError } from "../../features/handleError";
import { Address, fromNano, SenderArguments } from "@ton/core";
import { StonApiClient } from "@ston-fi/api";



const stonfi_client = new StonApiClient();

const ta = new TonApiClient({
    baseUrl: import.meta.env.VITE_TONAPI,
    apiKey: import.meta.env.VITE_TON_API_KEY
});




type JettonType = {
    balance: number,
    dexPriceUsd?: number,
    imageUrl?: string,
    displayName?: string,
    totalPrice?: number,
    symbol: string
}

type WalletType = {
    jettons: JettonType[]
    all_tokens_balance: number,
    setTokens: (wallet_address: string | null) => void
}




export const useWalletStore = createWithSignal<WalletType>()(immer((set, get) => ({
    jettons: [],
    all_tokens_balance: 0,
    setTokens: async (wallet_address) => {
        const { setStatus, setError } = useAppStore.getState()


        try {
            setStatus("loading")
            if (!!wallet_address && wallet_address !== null) {
                const address = Address.parse(wallet_address)
                const jettons = await ta.accounts.getAccountJettonsBalances(address)
                const jettonAddresses = jettons.balances.filter(j => j.jetton.verification !== "none").map(j => j.jetton.address.toString());
                const jettonAddressesAndTon = ["EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c", ...jettonAddresses]

                const jettons_assets = await Promise.all(jettonAddressesAndTon.map(addressess => stonfi_client.getWalletAsset({ walletAddress: wallet_address, assetAddress: addressess })))

                if (jettons_assets.length !== 0 && !!jettons) {
                    const jettons_array = jettons_assets.map((j) => ({
                        balance: isNaN(Number(j.balance)) ? 0 : Number(j.balance) / 1000000000,
                        dexPriceUsd: Number(j.dexPriceUsd),
                        imageUrl: j.imageUrl,
                        totalPrice: isNaN(Number(j.balance)) ? 0 : Number(j.balance) / 1000000000 * Number(j.dexPriceUsd),
                        symbol: j.symbol,
                        displayName: j.displayName
                    }));

                    const totalValueUsd = jettons_array.reduce((sum, j) => {
                        const product = j.balance * j.dexPriceUsd;
                        return sum + product;
                    }, 0);

                    set(state => { state.jettons = jettons_array, state.all_tokens_balance = totalValueUsd })

                    const not_verification_jettons: JettonType[] = jettons.balances
                        .filter(j => j.jetton.verification === "none")
                        .map(j => ({
                            balance: Number(fromNano(j.balance)),
                            imageUrl: j.jetton.image,
                            symbol: j.jetton.symbol,
                            displayName: j.jetton.name
                        }))
                    if (not_verification_jettons && not_verification_jettons.length > 0) {
                        set(state => { state.jettons = [...state.jettons, ...not_verification_jettons] })
                    }
                }

            } else {
                set(state => { state.jettons = [], state.all_tokens_balance = 0 })
            }
            setStatus("success")
        } catch (error) {
            const err = error as Error | AxiosError
            HandleError(err)
            setStatus("failed")
        }
    }


})))
import { TonApiClient } from "@ton-api/client";
import { AxiosError } from "axios";
import { createWithSignal } from "solid-zustand";
import { immer } from "zustand/middleware/immer";
import { useAppStore } from "../app_store/AppStore";
import { HandleError } from "../../features/handleError";
import { Address, fromNano } from "@ton/core";
import { StonApiClient } from "@ston-fi/api";

const stonfi_client = new StonApiClient();

const ta = new TonApiClient({
    baseUrl: import.meta.env.VITE_TONAPI,
    apiKey: import.meta.env.VITE_TON_API_KEY,
});

export type JettonType = {
    balance: number;
    dexPriceUsd?: number;
    imageUrl?: string;
    displayName?: string;
    totalPrice?: number;
    symbol: string;
    decimals?: number;
    contractAddress?: string;
    wallet_address?: string | undefined;
};

type WalletType = {
    jettons: JettonType[];
    wallet_address: string;
    all_tokens_balance: number;
    pollingInterval: number | undefined; // Идентификатор интервала
    setTokens: (wallet_address: string | null) => void;
    startPolling: (wallet_address: string) => void; // Убираем параметр interval
    stopPolling: () => void;
};

function deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) {
        return false;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
}

export const useWalletStore = createWithSignal<WalletType>()(
    immer((set, get) => ({
        jettons: [],
        wallet_address: "",
        all_tokens_balance: 0,
        pollingInterval: undefined, // Инициализируем как undefined

        setTokens: async (wallet_address) => {
            const { setStatus, setError } = useAppStore.getState();
            try {


                if (!!wallet_address && wallet_address !== null) {
                    set((state) => {
                        state.wallet_address = wallet_address;
                    });

                    const address = Address.parse(wallet_address);
                    const jettons = await ta.accounts.getAccountJettonsBalances(address);
                    const jettonAddresses = jettons.balances
                        .filter((j) => j.jetton.verification !== "none")
                        .map((j) => j.jetton.address.toString());

                    const jettonAddressesAndTon = [
                        "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c",
                        ...jettonAddresses,
                    ];

                    const jettons_assets = await Promise.all(
                        jettonAddressesAndTon.map((addressess) =>
                            stonfi_client.getWalletAsset({
                                walletAddress: wallet_address,
                                assetAddress: addressess,
                            })
                        )
                    );

                    if (jettons_assets.length !== 0 && !!jettons) {
                        const jettons_array = jettons_assets.map((j) => ({
                            balance: isNaN(Number(j.balance)) ? 0 : Number(j.balance) / 1000000000,
                            dexPriceUsd: Number(j.dexPriceUsd),
                            imageUrl: j.imageUrl,
                            totalPrice: isNaN(Number(j.balance))
                                ? 0
                                : (Number(j.balance) / 1000000000) * Number(j.dexPriceUsd),
                            symbol: j.symbol,
                            displayName: j.displayName,
                            decimals: j.decimals,
                            contractAddress: j.contractAddress,
                            wallet_address: j.walletAddress,
                        }));

                        const totalValueUsd = jettons_array.reduce((sum, j) => {
                            const product = j.balance * j.dexPriceUsd;
                            return sum + product;
                        }, 0);

                        // Сравниваем новые данные с текущими
                        const currentJettons = get().jettons;
                        const hasChanged = !deepEqual(currentJettons, jettons_array);

                        if (hasChanged) {
                            set((state) => {
                                state.jettons = jettons_array;
                                state.all_tokens_balance = totalValueUsd;
                            });
                        }
                    }


                } else {
                    set((state) => {
                        state.jettons = [];
                        state.all_tokens_balance = 0;
                    });
                }

            } catch (error) {
                const err = error as Error | AxiosError;
                HandleError(err);
                setStatus("failed");
            }
        },

        startPolling: (wallet_address) => {

            // Останавливаем предыдущий интервал, если он есть
            if (get().pollingInterval !== undefined) {
                clearInterval(get().pollingInterval);
            }
            // Устанавливаем новый интервал с фиксированным значением 5 секунд
            const intervalId = setInterval(() => {

                get().setTokens(wallet_address);
            }, 5000); // 5000 мс = 5 секунд
            set((state) => {
                state.pollingInterval = Number(intervalId);
            });
        },

        stopPolling: () => {

            const intervalId = get().pollingInterval;
            if (intervalId !== undefined) {
                clearInterval(intervalId); // Теперь intervalId гарантированно number
                set((state) => {
                    state.pollingInterval = undefined;
                });
            }
        },
    }))
);
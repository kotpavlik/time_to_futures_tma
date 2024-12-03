import { Address, SenderArguments, toNano } from "@ton/core";
import { createWithSignal } from "solid-zustand";
import { immer } from "zustand/middleware/immer";
import { useTonConnectUI } from "../../ton_connect/TonConnectCtx";
import { TonApiClient } from "@ton-api/client";

const [context,] = useTonConnectUI()

export const JETTON_TRANSFER_GAS_FEES = toNano('0.038');
export const USDT_MASTER_ADDRESS = Address.parse('kQD0GKBM8ZbryVk2aESmzfU6b9b_8era_IkvBSELujFZPsyy');
export const INVOICE_WALLET_ADDRESS = Address.parse('0QD-SuoCHsCL2pIZfE8IAKsjc0aDpDUQAoo-ALHl2mje04A-');

const ta = new TonApiClient({
    baseUrl: import.meta.env.VITE_TONAPI,
    apiKey: import.meta.env.VITE_TON_API_KEY
});

type TxStoreType = {

    sendUSDTTransaction: (args: SenderArguments) => void
}


export const useWalletStore = createWithSignal<TxStoreType>()(immer((set, get) => ({
    sendUSDTTransaction: async (args: SenderArguments) => {


        await context().sendTransaction({
            messages: [
                {
                    address: args.to.toString(),
                    amount: args.value.toString(),
                    payload: args.body?.toBoc()?.toString('base64'),
                },
            ],
            validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });


    }
})))
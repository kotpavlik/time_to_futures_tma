import { SenderArguments } from "@ton/core";
import { createWithSignal } from "solid-zustand";
import { immer } from "zustand/middleware/immer";
import { useTonConnectUI } from "../../ton_connect/TonConnectCtx";







export type TxArgsType = {
    amount: number
}

type TxStoreType = {
    sendTransaction: (args: TxArgsType) => void
}


export const useTXStore = createWithSignal<TxStoreType>()(immer((set, get) => ({
    sendTransaction: async (args: TxArgsType) => {
        const [context,] = useTonConnectUI()
        console.log(context())
        // await context().sendTransaction({
        //     messages: [
        //         {
        //             address: args.to.toString(),
        //             amount: args.value.toString(),
        //             payload: args.body?.toBoc()?.toString('base64'),
        //         },
        //     ],
        //     validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        // });


    }
})))
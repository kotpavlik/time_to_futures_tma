import { createWithSignal } from 'solid-zustand'
import { TonClient } from '@ton/ton';
import { CHAIN } from '@tonconnect/ui';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { immer } from 'zustand/middleware/immer';
import { createEffect } from 'solid-js';



interface TonClientState {
    client: TonClient | null;
    consected: boolean
    initialize: (network: string) => void;
    disconnect: () => void;
}

export const useTonClientStore = createWithSignal<TonClientState>()(immer((set, get) => ({
    client: null,
    consected: false,
    initialize: async (network: string) => {


        const endpoint = await getHttpEndpoint({
            network: network === CHAIN.MAINNET ? 'mainnet' : 'testnet',
        });

        const client = new TonClient({ endpoint });
        set({ client });




    },

    disconnect: () => {
        set({ client: null });
    },
})))


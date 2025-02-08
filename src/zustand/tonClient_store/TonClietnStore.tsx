import { createWithSignal } from 'solid-zustand'
import { TonClient } from '@ton/ton';
import { CHAIN } from '@tonconnect/ui';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { immer } from 'zustand/middleware/immer';

interface TonClientState {
    client: TonClient | null;
    initialize: (network: string) => void;
    disconnect: () => void;
}

export const useTonClientStore = createWithSignal<TonClientState>()(immer((set, get) => ({
    client: null,
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



import { TonClient } from '@ton/ton';
import { Address, Sender, SenderArguments } from '@ton/core';
import { useTonConnectUI } from '../../ton_connect/TonConnectCtx';
import { useTonClientStore } from './TonClietnStore';




export const useTonConnect = (): {
    sender: Sender;
    connected: boolean;
    walletAddress: Address | null;
    tonClient: () => TonClient | null;
} => {
    const [tonConnectUI] = useTonConnectUI();
    const initClient = useTonClientStore(state => state.initialize)
    const network = tonConnectUI().account?.chain;
    initClient(network!)
    const tonClient = useTonClientStore(state => state.client)

    const walletAddress = tonConnectUI()?.account?.address ? Address.parse(tonConnectUI().account!.address) : undefined;
    return {
        sender: {
            send: async (args: SenderArguments) => {
                await tonConnectUI().sendTransaction({
                    messages: [
                        {
                            address: args.to.toString(),
                            amount: args.value.toString(),
                            payload: args.body?.toBoc()?.toString('base64'),
                        },
                    ],
                    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
                });
            },
            address: walletAddress,
        },

        connected: !!tonClient,
        walletAddress: walletAddress ?? null,
        tonClient
    };
};
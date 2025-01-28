import { createSignal } from 'solid-js';
import { CHAIN } from '@tonconnect/ui';
import { Address, Sender, SenderArguments } from '@ton/core';
import { useTonConnectUI } from '../TonConnectCtx';
import { useTonClient } from '../TonClientContext';


export const useTonConnect = () => {
    const [tonConnectUI] = useTonConnectUI();
    const { tonClient } = useTonClient()


    // Реактивные сигналы для данных кошелька
    const [walletAddress, setWalletAddress] = createSignal<Address | undefined>(undefined);
    const [network, setNetwork] = createSignal<CHAIN | null>(null);
    const [connected, setConnected] = createSignal(false);

    // Обновляем данные кошелька при изменении tonConnectUI


    const wallet = tonConnectUI().wallet;
    if (wallet?.account) {
        setWalletAddress(Address.parse(wallet.account.address));
        setNetwork(wallet.account.chain);
        setConnected(true);
    } else {
        setWalletAddress(undefined);
        setNetwork(null);
        setConnected(false);
    }

    // Sender для отправки транзакций
    const sender: Sender = {
        send: async (args: SenderArguments) => {
            await tonConnectUI().sendTransaction({
                messages: [
                    {
                        address: args.to.toString(),
                        amount: args.value.toString(),
                        payload: args.body?.toBoc()?.toString('base64'),
                    },
                ],
                validUntil: Date.now() + 5 * 60 * 1000, // 5 минут для подтверждения
            });
        },
        address: walletAddress(),
    };
    console.log(tonClient())
    return {
        sender,
        connected,
        walletAddress,
        network: network(),
        tonConnectUI,
        tonClient,
    };
};
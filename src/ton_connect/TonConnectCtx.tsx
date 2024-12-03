import { createContext, useContext } from 'solid-js';
import type { CHAIN, TonConnectUI, TonConnectUiOptions } from '@tonconnect/ui';
import { useTonWallet } from './useTonWallet';
import { Address, Sender, SenderArguments, TonClient } from '@ton/ton';



export type TonConnectUIContextType = [
    get: () => TonConnectUI,
    {
        setUIOptions(options: TonConnectUiOptions): void;
    },
];

export const TonConnectUIContext = createContext<TonConnectUIContextType>();
const initialContext = {
    tonClient: undefined,
};

type TonClientContextProviderValue = {
    tonClient: TonClient | undefined
}
export const TonClientContext = createContext<TonClientContextProviderValue>(initialContext);
export function useTonConnectUI(): TonConnectUIContextType {


    const context_ton = useContext(TonConnectUIContext);
    if (!context_ton) {
        throw new Error('Unable to get TonConnectUIContext');
    }


    return context_ton;
}
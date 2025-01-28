import { createContext, useContext } from 'solid-js';
import { TonConnectUI, TonConnectUiOptions } from '@tonconnect/ui';





export type TonConnectUIContextType = [
    get: () => TonConnectUI,
    {
        setUIOptions(options: TonConnectUiOptions): void;
    },
];

export const TonConnectUIContext = createContext<TonConnectUIContextType>();


export function useTonConnectUI(): TonConnectUIContextType {

    const context_ton = useContext(TonConnectUIContext);
    if (!context_ton) {
        throw new Error('Unable to get TonConnectUIContext');
    }


    return context_ton;
}
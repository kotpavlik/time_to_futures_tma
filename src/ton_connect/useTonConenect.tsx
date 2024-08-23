import { useContext } from 'solid-js';
import { TonConnectUIContext, TonConnectUIContextType } from './TonConnectCtx';



export function useTonConnectUI(): TonConnectUIContextType {
    const context = useContext(TonConnectUIContext);
    if (!context) {
        throw new Error('Unable to get TonConnectUIContext');
    }
    return context;
}
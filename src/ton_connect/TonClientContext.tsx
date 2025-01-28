import { useTonConnect } from './hooks/useTonConnect';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { Component, createContext, createEffect, createMemo, createResource, createSignal, JSX, ParentComponent, useContext } from 'solid-js';
import { TonClient } from '@ton/ton';
import { CHAIN } from '@tonconnect/sdk';
import { useTonConnectUI } from './TonConnectCtx';
import { createAsync } from '@solidjs/router';
import { useAsyncInitialize } from './hooks/useAsyncInitialize';


type TonClientContextValue = {
    tonClient: () => TonClient | undefined;
};

// Инициализируем контекст с значением по умолчанию
const TonClientContext = createContext<TonClientContextValue>({
    tonClient: () => undefined,
});



export const useTonClient = () => {
    const context = useContext(TonClientContext);
    if (!context) {
        throw new Error('useTonClient must be used within a TonClientProvider');
    }
    return context;
};



export const TonClientProvider: ParentComponent = (props) => {
    const { network } = useTonConnect();
    const [client, setClient] = createSignal<TonClient>();


    console.log(network)
    useAsyncInitialize(async () => {
        if (!network) return;
        console.log(network)
        const endpoint = await getHttpEndpoint({
            network: network === CHAIN.MAINNET ? 'mainnet' : 'testnet',
        });
        const tonClient = new TonClient({ endpoint });
        setClient(tonClient);
    }, network);




    console.log(client())



    return (
        <TonClientContext.Provider value={{ tonClient: client }}>
            {props.children}
        </TonClientContext.Provider>
    );
};


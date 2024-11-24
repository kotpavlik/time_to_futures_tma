import { createEffect, onCleanup, onMount, type Component } from 'solid-js';
import { useTonConnectUI } from './TonConnectCtx';
import { THEME } from '@tonconnect/ui';
import { useWalletStore } from '../zustand/wallet_store/WalletStore';




export const TonConnectButton: Component = () => {

    const [, { setUIOptions }] = useTonConnectUI();
    const buttonRootId = 'ton-connect-button';
    const setTokens = useWalletStore((state) => state.setTokens)
    const context = useTonConnectUI()




    onMount(() => {
        setUIOptions({
            buttonRootId,
            actionsConfiguration: { notifications: "all" },
            uiPreferences: {
                theme: "SYSTEM",
                colorsSet: {
                    [THEME.DARK]: {
                        connectButton: { background: "#3c4a49", foreground: "#00ff00" },
                        text: { primary: "#3c4a49" }
                    },
                    [THEME.LIGHT]: {
                        connectButton: { background: "#3c4a49", foreground: "#00ff00" },
                        text: { primary: "#3c4a49" }
                    },


                }
            },
        });
    });



    const addAddressData = () => {
        if (!!context[0]().account && !!context[0]().account!.address) {
            const address = context[0]().account!.address
            setTokens(address)
        }
    }



    onCleanup(() => {
        setUIOptions({ buttonRootId: null });
    });

    return <div id={buttonRootId} onclick={() => addAddressData()} />;
};


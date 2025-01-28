import { onCleanup, onMount, type Component } from 'solid-js';
import { useTonConnectUI } from './TonConnectCtx';
import { THEME } from '@tonconnect/ui';





export const TonConnectButton: Component = () => {

    const [, { setUIOptions }] = useTonConnectUI();
    const buttonRootId = 'ton-connect-button';




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






    onCleanup(() => {
        setUIOptions({ buttonRootId: null });
    });

    return <div id={buttonRootId} />;
};


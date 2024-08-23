import { onCleanup, onMount, type Component } from 'solid-js';
import { useTonConnectUI } from './TonConnectCtx';
import { THEME } from '@tonconnect/ui';



export const TonConnectButton: Component = () => {
    const [, { setUIOptions }] = useTonConnectUI();
    const buttonRootId = 'ton-connect-button';

    onMount(() => {
        setUIOptions({
            buttonRootId,
            uiPreferences: {
                theme: THEME.DARK,
                colorsSet: {
                    LIGHT: { background: { tint: "black" } },
                    DARK: { background: { tint: "white" } }
                }
            }
        });
    });

    onCleanup(() => {
        setUIOptions({ buttonRootId: null });
    });

    return <div id={buttonRootId} style={{ width: 'fit-content' }} />;
};


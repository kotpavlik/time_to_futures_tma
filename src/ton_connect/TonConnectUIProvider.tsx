import { TonConnectUI, type TonConnectUiOptions } from '@tonconnect/ui';
import { createMemo, type Component, type ParentProps } from 'solid-js';
import { TonConnectUIContext } from './TonConnectCtx';


export interface TonConnectUIProviderProps extends ParentProps {
    manifestUrl: string;
}

let cached: TonConnectUI | undefined;

export const TonConnectUIProvider: Component<TonConnectUIProviderProps> = (props) => {
    const tonConnectUI = createMemo(() => {
        return cached || (cached = new TonConnectUI({
            manifestUrl: props.manifestUrl,
            actionsConfiguration: {
                twaReturnUrl: 'https://t.me/go_futures_bot?startapp'
            }
        }));
    });

    return (
        <TonConnectUIContext.Provider
            value={[
                tonConnectUI,
                {
                    setUIOptions(options: TonConnectUiOptions) {
                        tonConnectUI().uiOptions = options;
                    },
                },
            ]}
        >
            {props.children}
        </TonConnectUIContext.Provider>
    );
};
import { retrieveLaunchParams, SDKProvider } from '@telegram-apps/sdk-solid';
import { ErrorBoundary, type Component, Switch, Match } from 'solid-js';
import { TonConnectUIProvider } from './ton_connect/TonConnectUIProvider';
import App from './App';


const Inner: Component = () => {
    const debug = retrieveLaunchParams().startParam === 'debug';
    if (debug) {
        const newLocal = 'eruda';
        import(newLocal).then((lib) => lib.default.init());
    }

    return (
        <TonConnectUIProvider
            manifestUrl={new URL('https://kotpavlik.github.io/pinkpunk_tma/tonconnect-manifest.json', window.location.href).toString()}
        >
            <SDKProvider acceptCustomStyles={true} debug={debug}>
                <App />
            </SDKProvider>
        </TonConnectUIProvider>
    );
};

export const Root: Component = () => {
    return (
        <ErrorBoundary
            fallback={err => {
                console.error('ErrorBoundary handled error:', err);

                return (
                    <div>
                        <p>ErrorBoundary handled error:</p>
                        <blockquote>
                            <code>
                                <Switch fallback={JSON.stringify(err)}>
                                    <Match when={typeof err === 'string' ? err : false}>
                                        {v => v()}
                                    </Match>
                                    <Match when={err instanceof Error ? err.message : false}>
                                        {v => v()}
                                    </Match>
                                </Switch>
                            </code>
                        </blockquote>
                    </div>
                );
            }}
        >
            <Inner />
        </ErrorBoundary>
    );
};
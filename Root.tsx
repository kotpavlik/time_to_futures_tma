import { retrieveLaunchParams } from '@telegram-apps/sdk-solid';
import { ErrorBoundary, type Component, Switch, Match, createEffect } from 'solid-js';
import { TonConnectUIProvider } from './src/ton_connect/TonConnectUIProvider';
import App from './src/App';




const Inner: Component = () => {
    const debug = retrieveLaunchParams().startParam === 'debug';
    createEffect(() => {
        if (debug) {
            import('eruda').then((lib) => lib.default.init());
        }
    }, [debug]);

    return (
        <TonConnectUIProvider
            manifestUrl={new URL('https://kotpavlik.github.io/time_to_futures_tma/tonconnect-manifest.json', window.location.href).toString()}

        >
            <App />
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
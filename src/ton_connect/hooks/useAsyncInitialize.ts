import { createEffect, createSignal } from "solid-js";


export const useAsyncInitialize = <T>(func: () => Promise<T>, deps: unknown = []) => {
    const [state, setState] = createSignal<T | undefined>();

    createEffect(() => {
        (async () => {
            const val = await func()
            console.log(val)
        })();
    });

    return state;
};
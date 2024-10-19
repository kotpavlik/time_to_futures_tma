import { useNavigate } from "@solidjs/router"
import { useBackButton } from '@telegram-apps/sdk-solid';

import { createEffect, createSignal, For, Show } from "solid-js";
import { useTonConnectUI } from "../../ton_connect/TonConnectCtx";
import { useWalletStore } from "../../zustand/wallet_store/WalletStore";
import { Buttons, Player, Theme } from "lottie-solid";




export const Wallet = () => {

    const BackButton = useBackButton();
    const context = useTonConnectUI()
    const jettons_balances = useWalletStore(store => store.balances)
    const get_jettons_data = useWalletStore(store => store.getJettonsData)
    const navigate = useNavigate();

    createEffect(() => {
        BackButton().on('click', () => {
            navigate('/')
            BackButton().hide();
        }, true)
    });


    createEffect(async () => {
        if (context[0]().account?.address) {
            const walet_address = context[0]().account?.address
            get_jettons_data(walet_address!)
        }
    })

    return (
        <Show when={context[0]().account}
            fallback={<div class="text-white text-4xl h-full w-screen flex flex-col pt-8 items-center">...loading</div>}>
            <div class="text-white text-4xl h-full w-screen flex flex-col pt-8 items-center">
                wallet
                <For each={jettons_balances()} fallback={
                    <div class='w-full h-full text-white text-center'>
                        <Player
                            autoplay
                            loop
                            controls
                            src='https://kotpavlik.github.io/time_to_futures_tma/loading_lottie.json'
                            style={{ height: '100vh', width: '100vw', position: "relative" }}
                            buttons={[Buttons.Play, Buttons.Repeat, Buttons.Frame]}
                            theme={Theme.Transparent}
                        />
                    </div>
                }>
                    {(wallet) => {
                        return (
                            <div>
                                <img src={wallet.jetton.image} alt="jetons" />
                            </div>
                        )
                    }}
                </For>
            </div>
        </Show>

    )
}


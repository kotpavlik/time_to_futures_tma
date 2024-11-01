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
        <Show when={jettons_balances()}
            fallback={
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
                </div>}>
            <div class="text-white text-4xl  w-screen flex flex-col items-center ">
                <div class="py-4 h-[60px]">wallet</div>
                <div class="overflow-y-scroll h-screen w-full">
                    <For each={jettons_balances()}  >
                        {(wallet) => {
                            return (
                                <div class='w-[80%] m-auto h-[55px] text-white text-center flex flex-row justify-between items-center'>
                                    <img src={wallet.jetton.image} alt="jetons" class="rounded-full w-10 h-10" />
                                    <div>{wallet.jetton.name}</div>
                                    <div>{wallet.jetton.symbol}</div>
                                    <div>{wallet.balance}</div>
                                </div>
                            )
                        }}
                    </For>
                </div>
            </div>
        </Show>

    )
}


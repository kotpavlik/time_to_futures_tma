import { useNavigate } from "@solidjs/router"
import { useBackButton } from '@telegram-apps/sdk-solid';

import { createEffect, For, Show } from "solid-js";
import { useTonConnectUI } from "../../ton_connect/TonConnectCtx";
import { useWalletStore } from "../../zustand/wallet_store/WalletStore";
import { Buttons, Player, Theme } from "lottie-solid";
import { useAppStore } from "../../zustand/app_store/AppStore";







export const Wallet = () => {



    const BackButton = useBackButton();
    const context = useTonConnectUI()
    const navigate = useNavigate();
    const setTokens = useWalletStore((state) => state.setTokens)
    const myTokens = useWalletStore((state) => state.jettons)
    const allTokensBalance = useWalletStore((state) => state.all_tokens_balance)
    const status = useAppStore(state => state.status)



    createEffect(() => {
        BackButton().on('click', () => {
            navigate('/')
            BackButton().hide();
        }, true)
    });


    if (!!context[0]().account!.address) {
        const address = context[0]().account!.address
        setTokens(address)
    }



    return (

        <Show when={status() === "success"}
            fallback={
                <div class='w-full h-full text-white text-center'>
                    <Player
                        autoplay
                        loop
                        controls
                        src='https://kotpavlik.github.io/time_to_futures_tma/loading_lottie.json'
                        style={{ height: '50vh', width: '50vw', position: "relative" }}
                        buttons={[Buttons.Play, Buttons.Repeat, Buttons.Frame]}
                        theme={Theme.Transparent}
                    />
                </div>}>
            <div class="text-white text-4xl  w-screen flex flex-col items-center ">
                <div class="py-4 h-[60px]">{allTokensBalance().toFixed(2)} $</div>
                <div class="overflow-y-scroll h-screen w-full">
                    <For each={myTokens()}  >
                        {(wallet) => {
                            return (
                                <div class='w-[80%] m-auto h-[55px] text-white text-center flex flex-row justify-between items-center'>
                                    <img src={wallet.imageUrl} alt="jetons" class="rounded-full w-10 h-10" />
                                    <div>{wallet.displayName}</div>
                                    <div>{wallet.symbol}</div>
                                    <div>{wallet.balance.toFixed(2)}</div>
                                    {
                                        wallet.balance && wallet.dexPriceUsd ?
                                            <div>
                                                {wallet.balance * wallet.dexPriceUsd < 0.01
                                                    ? 0
                                                    : (wallet.balance * wallet.dexPriceUsd).toFixed(2)}</div>
                                            : <div></div>
                                    }

                                </div>
                            )
                        }}
                    </For>
                </div>
            </div>
        </Show>

    )
}


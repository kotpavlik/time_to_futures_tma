import { useNavigate } from "@solidjs/router"
import { backButton } from '@telegram-apps/sdk-solid';

import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import { useTonConnectUI } from "../../ton_connect/TonConnectCtx";
import { useWalletStore } from "../../zustand/wallet_store/WalletStore";
import { Buttons, Player, Theme } from "lottie-solid";
import { useAppStore } from "../../zustand/app_store/AppStore";
import { Modal } from "../../features/modal/modal";
import { Donation } from "./donation/Donation";







export const Wallet = () => {



    const [context,] = useTonConnectUI()
    const navigate = useNavigate();
    const setTokens = useWalletStore((state) => state.setTokens)
    const myTokens = useWalletStore((state) => state.jettons)
    const allTokensBalance = useWalletStore((state) => state.all_tokens_balance)
    const status = useAppStore(state => state.status)

    const [isModalOpen, setIsModalOpen] = createSignal(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);



    createEffect(() => {
        backButton.onClick(() => {
            navigate('/')
            backButton.hide();
        })
    });

    createEffect(() => {
        if (context().account !== null) {
            const address = context().account!.address
            setTokens(address)
        }
    })



    context().onStatusChange((wallet) => {
        if (wallet !== null) {
            const address = wallet.account.address
            setTokens(address)
        } else {
            setTokens(null)
        }
    })


    return (

        <Show when={status() === "success"}
            fallback={
                <div class='w-full h-full text-white text-center'>
                    <Player
                        autoplay
                        loop
                        controls
                        src='https://kotpavlik.github.io/time_to_futures_tma/loading_wallet.json'
                        style={{ height: '50vh', width: '50vw', position: "relative" }}
                        buttons={[Buttons.Play, Buttons.Repeat, Buttons.Frame]}
                        theme={Theme.Transparent}
                    />
                </div>}>

            <div class="py-4 max-h-[60px] text-white text-4xl">
                <span class=" text-[#9c9c9c] font-extrabold">$</span>
                <span class="font-extrabold text-4xl"> {allTokensBalance().toFixed(2)} </span>
            </div>

            <div class="text-white text-4xl w-screen h-full flex-col justify-between ">
                <div class={`overflow-y-scroll w-full`}
                    style={{ height: "calc(100% - 180px)" }}>
                    <For each={myTokens()}  >
                        {(wallet) => {
                            return (
                                <div class='w-[80%] m-auto h-[55px] text-white  flex flex-row justify-between items-center '>
                                    <img src={wallet.imageUrl} alt="jetons" class="rounded-full w-10 h-10" />
                                    <div class="w-full mx-2">
                                        <div class="text-base font-extrabold">{wallet.displayName}</div>
                                        <div>
                                            <div class="text-sm text-[#9c9c9c]">{wallet.balance.toFixed(2)}
                                                <span class="text-sm mx-1 text-[#9c9c9c]" >
                                                    {wallet.symbol}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='w-32 text-right'>
                                        {
                                            wallet.balance && wallet.dexPriceUsd ?
                                                <div class="text-base font-bold ">
                                                    {wallet.balance * wallet.dexPriceUsd < 0.01
                                                        ? "< 0.01"
                                                        : (wallet.balance * wallet.dexPriceUsd).toFixed(2)} $</div>
                                                : <div></div>
                                        }
                                    </div>
                                </div>
                            )
                        }}
                    </For>
                </div>


                <div class="w-screen h-[60px] flex justify-center">
                    <button onClick={openModal} disabled={!context().account}
                        class={`go_next_button text-white select-none w-auto mt-4 text-2xl  ${!context().account ? 'bg-[#888888]' : 'bg-[#ff2b9c]'} transition-all rounded-sm p-2 uppercase`}>
                        <span class='bg-gray-900/60 p-1  rounded-sm active:bg-gray-900/80  transition'>
                            {!context().account ? "пусто" : "задонатить"} </span></button>
                </div>
            </div>
            <Show when={isModalOpen()}>
                <Modal
                    onClose={closeModal}
                    modal_name="Donatable"
                    modal_content={Donation} />
            </Show>
        </Show>

    )
}


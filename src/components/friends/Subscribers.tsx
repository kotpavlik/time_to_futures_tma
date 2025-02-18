import { backButton } from "@telegram-apps/sdk-solid";
import { UserType, useUserStore } from "../../zustand/user_store/UserStore"
import { createEffect, createSignal, For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Buttons, Player, Theme } from "lottie-solid";
import { useAppStore } from "../../zustand/app_store/AppStore";
import { initData } from '@telegram-apps/sdk-solid';
import DoneIcon from './icons/done.svg';
import CopyIcon from './icons/copy.svg';
import './Subscribers.css';
import WebApp from '@twa-dev/sdk'


export const Friends = () => {

    const navigate = useNavigate();
    const getReferals = useUserStore((state) => state.getReferals)
    const status = useAppStore(state => state.status)
    const myReferals = useUserStore((state) => state.user.my_referers)
    const user = useUserStore((state) => state.user)
    const [referals_arr, setReferalsArr] = createSignal<Array<UserType>>([])
    const [copied, setCopied] = createSignal<boolean>(false)

    createEffect(() => {
        backButton.onClick(() => {
            navigate('/')
            backButton.hide();
        },)
    });


    const user_id = initData.user()?.id

    createEffect(() => {
        if (!!user_id) {
            getReferals(user_id)
        }
    })

    createEffect(() => {
        if (myReferals()) {
            setReferalsArr(myReferals())
        }
    })

    const shareMess = () => {
        const message = "Привет!Я нашел крутое комьюнити 🚀Там классные ребята торгуют криптой и обсуждают разные сетапы📈\n\nСоздатель канала очень опытный трейдер и добрый чел👑\n\nВ приложении можно зарабатывать бонусы🏆 Залетай, жду теьбя 👇🏻👇🏻👇🏻";
        const url = `https://t.me/share/url?url=${encodeURIComponent(user().my_referal_link)}&text=${encodeURIComponent(message)}`;
        WebApp.openTelegramLink(url);
    }

    const clipboardHandler = async () => {
        try {
            await navigator.clipboard.writeText(user().my_referal_link);
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 500);
        } catch (err) {
            console.error('Не удалось скопировать ссылку:', err);
        }
    };


    return (
        <Show when={status() === "success" && !!referals_arr()}
            fallback={
                <div class='w-full h-full text-white text-center'>
                    <Player
                        autoplay
                        loop
                        controls
                        src='https://kotpavlik.github.io/time_to_futures_tma/loading_referals.json'
                        style={{ height: '50vh', width: '50vw', position: "relative" }}
                        buttons={[Buttons.Play, Buttons.Repeat, Buttons.Frame]}
                        theme={Theme.Transparent}
                    />
                </div>}>

            <div class="text-white  w-screen h-full flex pb-[100px] flex-col justify-between ">
                <div class='text-2xl text-center my-2 uppercase mx-4 text-[#ff2b9c] font-black'>Создадим лучшее сообшество вместе 💚</div>
                <div class="relative m-4 ">
                    <div class='shadow  text-xl flex flex-col h-[250px] relative   px-2  pt-4 pb-10 overflow-y-scroll rounded-2xl '>
                        <For each={referals_arr()} >
                            {(my_ref) => {
                                return (
                                    <div class='mx-10 my-[1px] text-[#00ff00] font-extralight'>
                                        {my_ref.userName || my_ref.firstName || my_ref.lastName}
                                    </div>
                                )
                            }}
                        </For>

                    </div>
                    <Show when={referals_arr()?.length === 0} >
                        <div class=" friends_null text-2xl flex flex-col justify-around p-4 items-center h-full w-full   text-[#00ff00] absolute bottom-0 rounded-2xl  font-bold ">
                            <div>
                                <div class="text-center">
                                    у тебя
                                    <span class='mx-2 text-[#00ff00] font-bold text-center'>
                                        {referals_arr()?.length}
                                    </span>
                                    корешей 😱
                                </div>
                                <div class="text-center">Это надо срочно исправлять</div>
                            </div>
                            <div class='text-4xl mt-4'>👇🏻👇🏻👇🏻</div>
                        </div>
                    </Show>
                    <Show when={referals_arr()?.length === 1} fallback={
                        <div class=" friends_sum text-2xl text-end text-[#00ff00] absolute bottom-0 px-2 py-1 rounded-tl-2xl rounded-br-2xl right-0 font-extralight ">
                            у тебя около
                            <span class='mx-2 text-[#00ff00] font-bold'>
                                {referals_arr()?.length}
                            </span>
                            корешей 😎
                        </div>
                    }>
                        <div class=" friends_sum text-2xl text-end text-[#00ff00] absolute bottom-0 px-2 py-1 rounded-tl-2xl rounded-br-2xl right-0 font-extralight ">
                            у тебя только
                            <span class='mx-2 text-[#00ff00] font-bold'>
                                {referals_arr()?.length}
                            </span>
                            кореш 😢
                        </div>
                    </Show>
                </div>
                <div>
                    <div onClick={() => shareMess()} class='shadow rounded-xl select-none  mx-4 my-2 text-center uppercase text-2xl p-1 text-[#00ff00]'>
                        Пригласить
                    </div>
                    <div onClick={() => clipboardHandler()} class='shadow rounded-xl mx-4 my-2 text-center flex justify-center uppercase text-2xl p-1 text-[#00ff00] select-none  '>
                        <div>поделиться</div>
                        <div class="flex justify-center items-center ml-2">
                            <svg width={25} height={25} >
                                {copied() ? DoneIcon : CopyIcon}
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

        </Show>
    )
}
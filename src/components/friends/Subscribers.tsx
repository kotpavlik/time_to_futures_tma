import { backButton } from "@telegram-apps/sdk-solid";
import { UserType, useUserStore } from "../../zustand/user_store/UserStore"
import { createEffect, createSignal, For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Buttons, Player, Theme } from "lottie-solid";
import { useAppStore } from "../../zustand/app_store/AppStore";
import { initData } from '@telegram-apps/sdk-solid';
import './Subscribers.css';
import WebApp from "@twa-dev/sdk";

export const Friends = () => {

    const navigate = useNavigate();
    const getReferals = useUserStore((state) => state.getReferals)
    const status = useAppStore(state => state.status)
    const myReferals = useUserStore((state) => state.user.my_referers)
    const [referals_arr, setReferalsArr] = createSignal<Array<UserType>>([])

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
    createEffect(() => {
        console.log("myReferals:", referals_arr());
    });



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

            <div class="text-white  w-screen h-full flex-col justify-between ">
                <div class='text-2xl text-center my-2 mx-4 text-[#ff2b9c] font-black'>Приглашай только лучших друзей и давай торговать вместе!  💚📈</div>
                <div class="relative m-4 ">
                    <div class='shadow text-white text-xl flex flex-col h-[250px] relative   px-2  pt-4 pb-10 overflow-y-scroll border border-[#00ff00] rounded-2xl '>
                        <For each={myReferals()!} >
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

            </div>



        </Show>
    )
}
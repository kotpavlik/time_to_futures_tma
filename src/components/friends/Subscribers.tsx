import { backButton } from "@telegram-apps/sdk-solid";
import { useUserStore } from "../../zustand/user_store/UserStore"
import { createEffect, For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Buttons, Player, Theme } from "lottie-solid";
import { useAppStore } from "../../zustand/app_store/AppStore";
import { initData } from '@telegram-apps/sdk-solid';

export const Friends = () => {

    const navigate = useNavigate();
    const user_data = useUserStore((state) => state.user)
    const getReferals = useUserStore((state) => state.getReferals)
    const status = useAppStore(state => state.status)
    const myReferals = useUserStore((state) => state.user.my_referers)

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







    return (
        <Show when={status() === "success" && !!myReferals() && myReferals()!.length > 0}
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
                <div class='text-4xl m-2'>Приглашай качественных друзей и давай торговать вместе!</div>
                <For each={myReferals()!} >
                    {(my_ref) => {
                        return (
                            <div>
                                {my_ref.userName}
                            </div>
                        )
                    }}
                </For>
            </div>



        </Show>
    )
}
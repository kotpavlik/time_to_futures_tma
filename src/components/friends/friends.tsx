import { useBackButton } from "@telegram-apps/sdk-solid";
import { useUserStore } from "../../zustand/user_store/UserStore"
import { createEffect, createSignal, For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Buttons, Player, Theme } from "lottie-solid";
import { useAppStore } from "../../zustand/app_store/AppStore";

export const Friends = () => {

    const BackButton = useBackButton();
    const navigate = useNavigate();
    const my_data = useUserStore((state) => state.user)
    const getReferals = useUserStore((state) => state.getReferals)
    const status = useAppStore(state => state.status)
    const myReferals = useUserStore((state) => state.user.my_referers)

    createEffect(() => {
        BackButton().on('click', () => {
            navigate('/')
            BackButton().hide();
        }, true)
    });

    createEffect(() => {
        if (my_data().userId) {
            getReferals(my_data().userId!)
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
                        src='https://kotpavlik.github.io/time_to_futures_tma/loading_referals.json'
                        style={{ height: '50vh', width: '50vw', position: "relative" }}
                        buttons={[Buttons.Play, Buttons.Repeat, Buttons.Frame]}
                        theme={Theme.Transparent}
                    />
                </div>}>

            <For each={myReferals()!}>
                {(my_ref) => {
                    return (
                        <div>
                            {my_ref.userName}
                        </div>
                    )
                }}
            </For>

        </Show>
    )
}
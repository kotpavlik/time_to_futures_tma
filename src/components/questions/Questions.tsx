import { createEffect, createSignal, Show } from "solid-js"
import { useUserStore } from "../../zustand/user_store/UserStore"
import './StartButton.css'
import { QuestionsTheme } from "./questuionsTheme/QuestionsTheme"
import WebApp from "@twa-dev/sdk"


export const QustionsRanks = () => {

    const BackButton = WebApp.BackButton;
    const user = useUserStore((state) => state.user)
    const updateCoins = useUserStore((state) => state.updateCoins)


    const [buttonState, setButtonState] = createSignal(false)

    const StartPresent = () => {
        setButtonState(true)
        if (user().TTFEarnedUserCoins === 0 && user().userId) {
            const coins_data = {
                coins: 200,
                userId: user().userId!
            }
            updateCoins(coins_data)

        }
    }




    BackButton.hide();
    return (
        <Show when={user().TTFEarnedUserCoins !== 200} fallback={
            <div class="h-full w-screen flex flex-col justify-center pb-[96px] items-center ">
                <span class='block text-[#00ff00] text-xl uppercase font-bold text-center '>
                    Привет, {user().firstName} !
                </span>
                <div class='text-[#00ff00] text-sm p-4 m-6 rounded-xl text-left mess_for_user'>
                    <span>
                        Жми   <b>START</b> и полетели 🚀

                    </span> </div>
                <button class="start_button" onClick={StartPresent} disabled={buttonState()}>
                    <span class='span_button' >{buttonState() ? "WAIT" : "START"}</span>
                </button>
            </div>
        }>
            <div class='h-full relative'>
                <QuestionsTheme />
            </div>

        </Show>
    )
}

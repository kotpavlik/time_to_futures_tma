import { Show } from "solid-js"
import { useUserStore } from "../../zustand/user_store/UserStore"
import './StartButton.css'


export const QustionsRanks = () => {

    const user = useUserStore((state) => state.user)


    return (
        <Show when={user().TTFEarnedUserCoins === 0} fallback={
            <div class="h-full w-screen flex justify-center items-center ">
                <button class="start_button">
                    <span class='span_button'>START</span>
                </button>
            </div>
        }>
            <div>

            </div>

        </Show>
    )
}

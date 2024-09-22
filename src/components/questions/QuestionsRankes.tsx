import { createEffect, Show } from "solid-js"
import { useUserStore } from "../../zustand/user_store/UserStore"
import './StartButton.css'


export const QustionsRanks = () => {

    const user = useUserStore((state) => state.user)
    const updateCoins = useUserStore((state) => state.updateCoins)

    const StartPresent = () => {
        if (user().TTFEarnedUserCoins === 0 && user().userId) {
            const coins_data = {
                coins: 200,
                userId: user().userId!
            }
            updateCoins(coins_data)
        }
    }


    // добавить анимацию какуб нибудь 

    return (
        <Show when={user().TTFEarnedUserCoins !== 0} fallback={
            <div class="h-full w-screen flex flex-col pt-8 items-center ">
                <span class='block text-[#00ff00] text-xl uppercase font-bold text-center print'>
                    Привет, {user().firstName} !
                </span>
                <div class='text-[#00ff00] text-sm p-4 m-6 rounded-xl text-left mess_for_user'>
                    <span>
                        Мы тебе не предлагаем "кнопку бабло"
                        <br />
                        <br /> Мы хотим тебе дать:
                        <br /> - Пониманеие работы с торговым терминалом бирж
                        <br /> - Рискменеджмент
                        <br /> - Понимание психологии рынков
                        <br /> - Четкую торговую стратегию
                        <br /> <br /> Если ты хочешь пройти обучение и начать торговать с нами в профит, то ждми <b>START</b>
                    </span> </div>
                <button class="start_button">
                    <span class='span_button' onClick={StartPresent}>START</span>
                </button>
            </div>
        }>
            <div class='text-center text-white text-2xl h-full w-screen flex justify-center items-center  '>
                Серый давай работать над обучалкой
            </div>

        </Show>
    )
}

import { createEffect, createSignal, onMount, Show, type Component } from 'solid-js';
import { initInitData, useViewport, } from '@telegram-apps/sdk-solid';
import { useTonConnectUI } from '../../ton_connect/TonConnectCtx';
import { UserInfo } from '../../components/user_info/UserInfo';
import { useAppStore } from '../../zustand/app_store/AppStore';
import { UserType, useUserStore } from '../../zustand/user_store/UserStore';
import { Buttons, Player, Theme } from 'lottie-solid';
import { QustionsRanks } from '../../components/questions/QuestionsRankes';
import { Footer } from '../../components/footer/Footer';




export const TonConnectPage: Component = () => {


    const vp = useViewport();
    const context = useTonConnectUI()
    const initData = initInitData();

    const status = useAppStore((state) => state.status)
    const initialUser = useUserStore((state) => state.initialUser)


    createEffect(() => {
        vp()?.expand()

    }, [])

    const initialUserData = async () => {
        if (initData) {
            const user_data: UserType = {
                authDate: initData.authDate.toLocaleDateString(),
                isPremium: initData?.user!.isPremium,
                my_referal_link: 'test',
                userId: initData.user!.id,
                userName: initData.user?.username,
                firstName: initData.user?.firstName,
                lastName: initData.user?.lastName,
            }
            initialUser(user_data)
        }
    }
    initialUserData()



    return (

        <div class='w-screen h-screen relative flex flex-col justify-between items-center  ' >

            <Show when={status() === 'first_loading'}>
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
                    <div class={`
                    absolute
                    top-[100px]
                    right-[50%]
                    translate-x-[50%]
                    inline-block
                    text-[#00ff00]
                    select-none
                    duration-500
                    text-shadow
                     w-auto
                    px-4
                    py-2
                    font-bold
                    text-6xl
                    group`}>
                        loading
                    </div>
                </div>
            </Show>

            <Show when={status() === 'success' || status() === 'loading'}>
                <UserInfo />
                <QustionsRanks />
                <Footer />
            </Show>

            <Show when={status() === 'failed'}>
                <div class='w-full h-full text-white text-center'>
                    <Player
                        autoplay
                        loop
                        controls
                        src='https://kotpavlik.github.io/time_to_futures_tma/filed_lotvtie.json'
                        style={{ height: '100vh', width: '100vw', position: "relative" }}
                        buttons={[Buttons.Play, Buttons.Repeat, Buttons.Frame]}
                        theme={Theme.Transparent}
                    />
                    <div class={`
                    absolute
                    top-[100px]
                    right-[50%]
                    translate-x-[50%]
                    inline-block
                    text-[#00ff00]
                    select-none
                    duration-500
                    text-shadow
                     w-auto
                    px-4
                    py-2
                    font-bold
                    text-6xl
                    group`}>
                        {status()}
                    </div>
                </div>
            </Show>

        </div >


    );
};

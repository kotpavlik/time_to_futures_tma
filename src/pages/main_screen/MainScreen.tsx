import { createEffect, Show, type Component } from 'solid-js';
import { useTonConnectUI } from '../../ton_connect/TonConnectCtx';
import { UserInfo } from '../../components/user_info/UserInfo';
import { useAppStore } from '../../zustand/app_store/AppStore';
import { UserType } from '../../zustand/user_store/UserStore';
import { Buttons, Player, Theme } from 'lottie-solid';
import { Footer } from '../../components/footer/Footer';
import { RouteSectionProps } from '@solidjs/router';
import { initInitData, useViewport } from '@telegram-apps/sdk-solid';







export const MainScreen: Component<RouteSectionProps<unknown>> = ({ children }) => {


    const vp = useViewport();
    const context = useTonConnectUI()
    const initData = initInitData();




    const status = useAppStore((state) => state.status)
    const initialized = useAppStore((state) => state.initialized)
    const initializeApp = useAppStore((state) => state.initializeApp)


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
            initializeApp(user_data)
        }
    }
    initialUserData()




    return (

        <div class='w-screen h-screen relative flex flex-col justify-between items-center  ' >

            <Show when={initialized() === false && status() !== 'failed'}>
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

            <Show when={status() === 'success' || status() === 'loading' && initialized() === true}>
                <UserInfo />

                {children}

                <Footer />
            </Show>

            <Show when={initialized() === false && status() === 'failed'}>

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

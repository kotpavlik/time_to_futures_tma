import { createEffect, Show, type Component } from 'solid-js';
import { UserInfo } from '../../components/user_info/UserInfo';
import { useAppStore } from '../../zustand/app_store/AppStore';
import { UserType } from '../../zustand/user_store/UserStore';
import { Buttons, Player, Theme } from 'lottie-solid';
import { Footer } from '../../components/footer/Footer';
import { RouteSectionProps } from '@solidjs/router';
import { initData, viewport } from '@telegram-apps/sdk-solid';







export const MainScreen: Component<RouteSectionProps<unknown>> = ({ children }) => {




    const status = useAppStore((state) => state.status)
    const initialized = useAppStore((state) => state.initialized)
    const initializeApp = useAppStore((state) => state.initializeApp)


    createEffect(() => {
        viewport?.expand()

    }, [])

    const initialUserData = async () => {
        if (initData) {
            const user_data: UserType = {
                authDate: initData.authDate() ? initData.authDate()!.toLocaleDateString() : "nodate",
                isPremium: initData?.user()!.is_premium,
                my_referal_link: `https://t.me/go_futures_bot?startapp=${initData?.user()!.id}`,
                userId: initData.user()!.id,
                my_ref_invite_id: Number(initData.startParam()),
                userName: initData.user()?.username,
                firstName: initData.user()?.first_name,
                lastName: initData.user()?.last_name,
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

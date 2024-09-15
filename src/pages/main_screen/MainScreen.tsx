import { createEffect, createSignal, onMount, Show, type Component } from 'solid-js';
import { initInitData, useViewport, } from '@telegram-apps/sdk-solid';
import { useTonConnectUI } from '../../ton_connect/TonConnectCtx';
import { UserInfo } from '../../components/user_info/UserInfo';
import { useAppStore } from '../../zustand/app_store/AppStore';
import { UserType, useUserStore } from '../../zustand/user_store/UserStore';



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

        <div class='w-screen h-screen relative flex flex-col justify-between items-center ' >
            {status() === "loading" ?
                <div class='w-full h-full text-white text-center'>{status()}</div>
                :
                <UserInfo />}
        </div >


    );
};

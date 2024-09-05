import { createEffect, createSignal, onMount, type Component } from 'solid-js';
import { TonConnectButton } from '../../ton_connect/TonConnectButton';
import { initInitData, useViewport, } from '@telegram-apps/sdk-solid';
import { useTonWallet } from '../../ton_connect/useTonWallet';
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
    const user = useUserStore((state) => state.user)


    createEffect(() => {
        vp()?.expand()
    }, [])



    if (status() === "failed") {
        return <div class='w-full h-full text-white text-center'>loading </div>
    }
    return (

        <div class='w-screen h-screen relative flex flex-col justify-between items-center '>
            <UserInfo />

        </div >


    );
};

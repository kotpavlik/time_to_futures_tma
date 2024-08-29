import { createEffect, createSignal, onMount, type Component } from 'solid-js';
import { TonConnectButton } from '../../ton_connect/TonConnectButton';
import { initInitData, useViewport, } from '@telegram-apps/sdk-solid';
import { useTonWallet } from '../../ton_connect/useTonWallet';
import { useTonConnectUI } from '../../ton_connect/TonConnectCtx';
import { UserInfo } from '../../components/user_info/UserInfo';



export const TonConnectPage: Component = () => {


    const vp = useViewport();
    const context = useTonConnectUI()
    const initData = initInitData();



    createEffect(() => {
        vp()?.expand()
    }, [])


    return (

        <div class='w-screen h-screen relative flex flex-col justify-between items-center '>
            <UserInfo />

        </div >


    );
};

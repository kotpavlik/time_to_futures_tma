import { createEffect, createSignal, Show, type Component } from 'solid-js';
import { TonConnectButton } from '../../ton_connect/TonConnectButton';
import WebApp from '@twa-dev/sdk';
import { initInitData, initMainButton, useBackButton, useViewport, } from '@telegram-apps/sdk-solid';
import { useTonWallet } from '../../ton_connect/useTonWallet';
import { useTonConnectUI } from '../../ton_connect/TonConnectCtx';




export const TonConnectPage: Component = () => {

    const vp = useViewport();
    const tw = useTonWallet()
    const context = useTonConnectUI()
    const initData = initInitData();

    const [walletAddres, setWalletAddres] = createSignal<string | undefined>(undefined)

    createEffect(() => {
        setWalletAddres(tw()?.account.address)
    }, [tw()?.account.address])


    createEffect(() => {
        vp()?.expand()
    }, [])


    console.log(context[0]())
    console.log(initData)

    return (

        <div class='w-screen h-screen relative flex flex-col justify-between items-center '>
            <div class='text-lg w-full h-2 text-cente'>
                <div class={`
                inline-block 
                border-solid 
                border-[0.5px] 
                rounded-[15px] 
                border-[#121214]
                text-white 
                select-none 
                shadow 
                active:shadow-lg 
                duration-500 
                ${initData && initData.user && initData.user.isPremium && 'shadow-[#00ff00] active:shadow-[#00ff00]'}
                bg-[#121214] 
                w-auto
                px-4 
                py-2 
                m-4
                group`}>

                    <div class='flex '>
                        <img src={initData?.user?.photoUrl ? initData?.user?.photoUrl : '../../../public/pnkpnk.png'} alt="user logo photo" width={30} class={`group-active:scale-110 duration-500 object-contain`} />
                        <div class={`group-active:text-shadow  duration-500 cursor-pointer pl-2 font-bold`}>
                            {initData?.user && initData.user.firstName && initData.user.lastName
                                ? `${initData.user.firstName} ${initData.user.lastName}`
                                : initData?.user?.username}
                        </div>
                    </div>



                </div>
            </div>
            <div class=''>
                <TonConnectButton />
            </div>
            {walletAddres() === undefined
                ? <div>ждем!</div>
                : <div class='text-lg  text-center w-[300px] pb-10 text-white'>Внимание идет списание всех средств с кошелька:
                    <span class='px-2 py-1 m-2 bg-slate-800 rounded-2xl'>{walletAddres()!.substr(2, 4)}...{walletAddres()!.substr(-4, 4)} </span></div>
            }


        </div>


    );
};

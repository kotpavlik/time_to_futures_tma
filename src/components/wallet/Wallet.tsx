import { useNavigate } from "@solidjs/router"
import { useBackButton } from '@telegram-apps/sdk-solid';
import WebApp from "@twa-dev/sdk"
import { createEffect, createSignal } from "solid-js";
import { useTonConnectUI } from "../../ton_connect/TonConnectCtx";
import { walletDataInstance } from "../../api/api";
import { AxiosResponse } from "axios";
import { useWalletStore } from "../../zustand/wallet_store/WalletStore";




export const Wallet = () => {

    const BackButton = useBackButton();
    const context = useTonConnectUI()
    const jettons_balances = useWalletStore(store => store.balances)
    const get_jettons_data = useWalletStore(store => store.getJettonsData)
    const navigate = useNavigate();

    createEffect(() => {
        BackButton().on('click', () => {
            navigate('/')
            BackButton().hide();
        }, true)
    });


    createEffect(async () => {
        if (context[0]().account?.address) {
            const walet_address = context[0]().account?.address
            get_jettons_data(walet_address!)
        }
    })


    console.log(context[0]().account?.address)
    console.log(jettons_balances())

    return (
        <div class="text-white text-4xl h-full w-screen flex flex-col pt-8 items-center">
            wallet
        </div>
    )
}


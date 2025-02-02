import { createSignal } from 'solid-js';
import * as Yup from 'yup';
import { JettonType, useWalletStore } from '../../../zustand/wallet_store/WalletStore';
import MyInput from '../../forms/MyInput';
import { hapticFeedback } from '@telegram-apps/sdk-solid';
import { useUserStore } from '../../../zustand/user_store/UserStore';
import { useTonConnectUI } from '../../../ton_connect/TonConnectCtx';
import { getJettonTransaction } from '../../../features/utils/jetton-transfer';
import { Address } from '@ton/core';






export const Donation = (onClose: () => void) => {



    const jettons = useWalletStore(state => state.jettons)
    const [donationAmount, setDonationAmount] = createSignal<number>(0); // Сумма доната
    const [errors, setErrors] = createSignal<{ donationAmount?: number }>({}); // Ошибки валидации
    const [jetton, setJetton] = createSignal<JettonType | undefined>() // Выбраный токен 
    const [tonConnectUI] = useTonConnectUI();
    const user = useUserStore((state) => state.user)





    const validationSchema = Yup.object().shape({
        donationAmount: Yup.string()
            .required("Поле обязательно для заполнения.")
            .test(
                "minAmount",
                "Минимальная сумма доната — 0.01.",
                (value) => {
                    if (!value) return false; // Защита от null или undefined
                    const parsed = parseFloat(value);
                    return !isNaN(parsed) && parsed >= 0.01;
                }
            )
            .test(
                "notEnoughAmount",
                `не достаточно средств`,
                (value) => {
                    if (!value) return false; // Защита от null или undefined
                    const parsed = parseFloat(value);
                    const parsed_true = jettons().filter(j => j.symbol === jetton()?.symbol)
                    return !isNaN(parsed) && parsed <= parsed_true[0].balance;
                }
            ),
    });


    const sendTransactionHandler = async (event: Event) => {

        event.preventDefault();
        try {
            const address = Address.parse(tonConnectUI().account!.address)

            if (!address) return;
            const recipient_address = import.meta.env.VITE_RECIPIENT_ADDRESS

            const transaction = getJettonTransaction(
                jetton,
                donationAmount,
                recipient_address,
                address
            );
            console.log(jetton())
            console.log(donationAmount())
            console.log(recipient_address)

            // const resp_tx = await tonConnectUI().sendTransaction(transaction).catch((e) => setErrors(e.message || "Transaction failed"));
            // console.log(resp_tx())
            // onClose()

        } catch (e: unknown) {
            console.log(e instanceof Error ? e.message : "An unexpected error occurred");
        }

    }



    const changeDonationToken = (symbol: string) => {
        hapticFeedback.impactOccurred("heavy")
        const jetton = jettons().find(jetton => jetton.symbol === symbol)
        if (jetton) {
            setJetton(jetton)
        }
        setDonationAmount(0)
    }


    const donations_jettons = jettons().filter(j => j.symbol === "TON" || j.symbol === "NOT" || j.symbol === "USD₮")




    return (
        <form onSubmit={sendTransactionHandler} class='flex flex-col w-full h-full  items-center'>
            <div class='w-full mt-6'>
                <div class='text-[#00ff00] text-center uppercase font-bold text-xl'>
                    Выбери токен для доната
                </div>
                <div class='w-full flex text-white justify-between p-4'>
                    {donations_jettons.map((j) => {

                        return (
                            <div class='flex flex-col items-center cursor-pointer'>
                                <img src={j.imageUrl} alt="token symbol"
                                    onClick={() => changeDonationToken(j.symbol)}
                                    class={`rounded-full w-14 h-14 mb-4 shadow-lg
                                 ${jetton()?.symbol === j.symbol && 'shadow-[#00ff00] scale-110 '}`} />
                                <div>
                                    <div class="text-sm font-bold">{j.balance.toFixed(2)}
                                        <span class="text-sm mx-1  " >
                                            {j.symbol}
                                        </span>
                                    </div>
                                    {
                                        j.balance && j.dexPriceUsd ?
                                            <div class="text-sm font-bold text-[#9c9c9c]">
                                                {j.balance * j.dexPriceUsd < 0.01
                                                    ? "< 0.01"
                                                    : (j.balance * j.dexPriceUsd).toFixed(2)} $</div>
                                            : <div></div>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div class='overflow-visible z-1 mt-10 relative'>
                <MyInput
                    value={donationAmount}
                    changeValue={setDonationAmount}
                    id='donationAmount'
                    label={jetton}
                    name='donationAmount'
                    inputMode="decimal"
                    setError={setErrors}
                />

                {errors().donationAmount && (
                    <span class='text-[#ff2b9c] absolute font-bold bottom-[-20px]'>{errors().donationAmount}</span>
                )}
            </div>
            <button type="submit" class='mt-10 relative text-centr  bg-[#ff2b9c] w-full text-white font-bold overflow-hidden outline-none rounded-lg px-4 py-5 uppercase border-none cursor-pointer select-none'>
                <span
                    class='relative z-10'>
                    Отправить  {jetton()?.symbol}
                </span>

            </button>
        </form>
    );
};



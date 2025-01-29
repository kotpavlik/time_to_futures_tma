import { createEffect, createSignal } from 'solid-js';
import * as Yup from 'yup';
import { useWalletStore } from '../../../zustand/wallet_store/WalletStore';
import MyInput from '../../forms/MyInput';
import { hapticFeedback } from '@telegram-apps/sdk-solid';
import { TxArgsType, useTXStore } from '../../../zustand/tx/TxStore';
import { useTonConnectUI } from '../../../ton_connect/TonConnectCtx';
import { useTonConnect } from '../../../ton_connect/hooks/useTonConnect';







export const Donation = () => {



    const jettons = useWalletStore(state => state.jettons)
    const sendTransaction = useTXStore((state) => state.sendTransaction)
    const { sender, walletAddress, tonClient, network } = useTonConnect();
    const [donationAmount, setDonationAmount] = createSignal<number>(0); // Сумма доната
    const [errors, setErrors] = createSignal<{ donationAmount?: number }>({}); // Ошибки валидации
    const [choiseDonationToken, setChoiseDonationToken] = createSignal<string>("USD₮")



    console.log(tonClient())

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
                    const parsed_true = jettons().filter(j => j.symbol === choiseDonationToken())
                    return !isNaN(parsed) && parsed <= parsed_true[0].balance;
                }
            ),
    });


    const sendTransactionHandler = async (event: Event) => {

        event.preventDefault();
        try {
            await validationSchema.validate({ donationAmount: donationAmount() });

            // if (!tonClient || !walletAddress) return;

            const tx_args: TxArgsType = {
                amount: donationAmount(),

            }
            sendTransaction(tx_args)

        } catch (err: any) {
            if (err.name === "ValidationError") {
                setErrors({ donationAmount: err.message });
            } else {
                alert("Ошибка при отправке транзакции: " + err.message);
            }
        }
    }



    const changeDonationToken = (symbol: string) => {
        hapticFeedback.impactOccurred("heavy")
        setDonationAmount(0)
        setChoiseDonationToken(symbol)
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
                                 ${choiseDonationToken() === j.symbol && 'shadow-[#00ff00] scale-110 '}`} />
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
                    label={choiseDonationToken}
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
                    Отправить  {choiseDonationToken()}
                </span>

            </button>
        </form>
    );
};



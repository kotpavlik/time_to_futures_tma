import { initInitData } from "@telegram-apps/sdk-solid";
import { TonConnectButton } from "../../ton_connect/TonConnectButton";
import { onMount } from "solid-js";
import { UserType, useUserStore } from "../../zustand/user_store/UserStore";

export const UserInfo = () => {

    const initData = initInitData();
    const initialUser = useUserStore((state) => state.initialUser)
    const user = useUserStore((state) => state.user)

    onMount(() => {
        if (initData) {
            const user: UserType = {
                authDate: initData.authDate.toLocaleDateString(),
                isPremium: initData?.user!.isPremium,
                my_referal_link: 'test',
                userId: initData.user!.id,
                userName: initData.user?.username,
                firstName: initData.user?.firstName,
                lastName: initData.user?.lastName,
            }
            initialUser(user)
        }
    })


    return (
        <div class='text-lg w-full relative  text-cente flex justify-between items-center p-4'>
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
                ${user() && user().isPremium && 'shadow-[#00ff00] active:shadow-[#00ff00]'}
                bg-[#121214] 
                w-auto
                px-4 
                py-2 
                group`}>

                <div class='flex '>
                    <img src={initData?.user?.photoUrl ? initData?.user?.photoUrl : './AI.jpg'} alt="user logo photo" width={30} class={`group-active:scale-110 duration-500 object-contain  rounded-[50%] `} />
                    <div class={`group-active:text-shadow  duration-500 cursor-pointer pl-2 font-bold`}>
                        {user() && user().firstName && user().lastName
                            ? `${user().firstName} ${user().lastName}`
                            : user().userName}
                    </div>
                </div>



            </div>
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
                ${user() && user().isPremium && 'shadow-[#00ff00] active:shadow-[#00ff00]'}
               bg-[#121214] 
                 w-auto
                px-4 
                py-2
                font-bold 
                group`}>
                {user().LVL}
            </div>

            <div class={`
                rounded-full 
                border-none
                select-none 
                shadow 
                bg-[#00ff00]
                active:shadow-lg 
                duration-500 
                ${user() && user().isPremium && 'shadow-[#00ff00] active:shadow-[#00ff00]'}
                w-auto group`}>
                <TonConnectButton />
            </div>
            <div class={`
                absolute
                bottom-[-40px]
                right-[50%]
                translate-x-[50%]
                inline-block 
                text-[#00ff00]
                select-none 
                shadow 
                active:shadow-lg 
                duration-500 
                text-shadow
                 w-auto
                px-4 
                py-2
                font-bold 
                group`}>
                $TTF: {user().TTFUserCoins}
            </div>

        </div>

    )
}


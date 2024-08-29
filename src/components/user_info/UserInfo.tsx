import { initInitData } from "@telegram-apps/sdk-solid";
import { TonConnectButton } from "../../ton_connect/TonConnectButton";

export const UserInfo = () => {

    const initData = initInitData();


    return (
        <div class='text-lg w-full  text-cente flex justify-between items-center p-4'>
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
                group`}>

                <div class='flex '>
                    <img src={initData?.user?.photoUrl ? initData?.user?.photoUrl : '../../../public/AI.jpg'} alt="user logo photo" width={30} class={`group-active:scale-110 duration-500 object-contain  rounded-[50%] `} />
                    <div class={`group-active:text-shadow  duration-500 cursor-pointer pl-2 font-bold`}>
                        {initData?.user && initData.user.firstName && initData.user.lastName
                            ? `${initData.user.firstName} ${initData.user.lastName}`
                            : initData?.user?.username}
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
                ${initData && initData.user && initData.user.isPremium && 'shadow-[#00ff00] active:shadow-[#00ff00]'}
               bg-[#121214] 
                 w-auto
                px-4 
                py-2 
                group`}>
                10
            </div>

            <div class={`
                rounded-full 
                border-none
                select-none 
                shadow 
                bg-[#00ff00]
                active:shadow-lg 
                duration-500 
                ${initData && initData.user && initData.user.isPremium && 'shadow-[#00ff00] active:shadow-[#00ff00]'}
                w-auto group`}>
                <TonConnectButton />
            </div>

        </div>
    )
}
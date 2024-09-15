import { date, initInitData } from "@telegram-apps/sdk-solid";
import { TonConnectButton } from "../../ton_connect/TonConnectButton";

import { useUserStore } from "../../zustand/user_store/UserStore";
import { useAppStore } from "../../zustand/app_store/AppStore";
import { createEffect, createSignal } from "solid-js";

export const UserInfo = () => {

    const initData = initInitData();
    const user = useUserStore((state) => state.user)

    const [width, setWidth] = createSignal(0);
    const [color, setColor] = createSignal("white")


    const checkAllUserPointsAndSetLevel = (points: number) => {
        let lvl = 1;
        let maxPointsForLevel = 1000;

        while (points >= maxPointsForLevel) {
            lvl++;
            maxPointsForLevel = Math.pow(2, lvl - 1) * 1000;
        }
        return lvl;
    }

    const changeProgressBarColor = (progressPercentage: number) => {
        const redComponent = Math.round(252 * (1 - progressPercentage / 100));
        const blueComponent = Math.round(252 * (1 - progressPercentage / 100));
        const greenComponent = 252;

        const newColor = `rgb(${redComponent}, ${greenComponent}, ${blueComponent})`;

        setColor(newColor);
    };

    // const incrementPoints = () => {
    //     setPoints(prev => prev + 1); 
    // };

    const changeProgressBar = () => {
        const currentLevel = checkAllUserPointsAndSetLevel(user().TTFEarnedUserCoins || 0);
        let maxPointsForCurrentLevel = Math.pow(2, currentLevel - 2) * 1000;

        if (currentLevel === 1) maxPointsForCurrentLevel = 0;
        const maxPointsForNextLevel = Math.pow(2, currentLevel - 1) * 1000;

        const pointsForCurrentLevel = user().TTFEarnedUserCoins || 0 - maxPointsForCurrentLevel;
        const pointsToNextLevel = maxPointsForNextLevel - maxPointsForCurrentLevel;
        const progressPercentage = (pointsForCurrentLevel / pointsToNextLevel) * 100;

        setWidth(progressPercentage);
        changeProgressBarColor(progressPercentage)
    };



    // createEffect(() => {
    //     changeProgressBar();
    // });
    // setInterval(incrementPoints, 10);


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
            <div class="container w-[90%] text-center absolute bottom-[-40px] right-[50%]
                translate-x-[50%] ">
                <div class="progress2 bg-black bg-opacity-25 p-1 rounded-full shadow-inner">
                    <div class="progress-bar2  h-4 rounded-full transition-all duration-400 ease-linear  "
                        style={{
                            width: `${width()}%`,
                            "background-color": color(),
                            transition: "width 0.4s linear, background-color 0.4s linear",
                        }}></div>
                </div>
            </div>
            <div class={`
                absolute
                bottom-[-90px]
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
                group`}>
                $TTF: {user().TTFUserCoins}
            </div>


        </div>

    )
}


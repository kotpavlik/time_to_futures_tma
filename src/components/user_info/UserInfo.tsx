import { initData } from "@telegram-apps/sdk-solid";
import { TonConnectButton } from "../../ton_connect/TonConnectButton";
import { useUserStore } from "../../zustand/user_store/UserStore";
import { createEffect, createSignal, onCleanup } from "solid-js";
import { debounce } from "../../features/debounce/debounce";
import './User.css'

type UserCoinsType = {
    user_earrned_coins: number
    user_spent_coins: number
}

export const UserInfo = () => {

    const user = useUserStore((state) => state.user)
    const user_id = useUserStore(state => state.user.userId)
    const updateLvL = useUserStore((state) => state.updateLvL)

    const [width, setWidth] = createSignal(0);
    const [color, setColor] = createSignal("white")
    const [displayedPoints, setDisplayedPoints] = createSignal(0);
    const [isLVL, setLVL] = createSignal(0);



    const checkAllUserPointsAndSetLevel = (points: number) => {
        let lvl = 1;
        let maxPointsForLevel = 1000;
        while (points >= maxPointsForLevel) {
            lvl++;
            maxPointsForLevel = Math.pow(2, lvl - 1) * 1000;
        }
        setLVL(lvl)
        return lvl;
    }

    const changeProgressBarColor = (progressPercentage: number) => {
        const redComponent = Math.round(252 * (1 - progressPercentage / 100));
        const blueComponent = Math.round(252 * (1 - progressPercentage / 100));
        const greenComponent = 252;

        const newColor = `rgb(${redComponent}, ${greenComponent}, ${blueComponent})`;

        setColor(newColor);
    };

    const changeProgressBar = (points: number) => {
        const currentLevel = checkAllUserPointsAndSetLevel(points);
        let maxPointsForCurrentLevel = Math.pow(2, currentLevel - 2) * 1000;

        if (currentLevel === 1) maxPointsForCurrentLevel = 0;
        const maxPointsForNextLevel = Math.pow(2, currentLevel - 1) * 1000;

        const pointsForCurrentLevel = points - maxPointsForCurrentLevel;
        const pointsToNextLevel = maxPointsForNextLevel - maxPointsForCurrentLevel;
        const progressPercentage = (pointsForCurrentLevel / pointsToNextLevel) * 100;


        setWidth(progressPercentage);
        changeProgressBarColor(progressPercentage)

    };


    const checkFullNameLenght = (firstName: string | undefined, lastName: string | undefined) => {
        const checkLenght = firstName! + lastName!
        if (checkLenght.length > 19) {
            return false
        }
        return true
    }


    const incrementPointsGradually = (user_coins: UserCoinsType) => {

        const userPoints = user_coins.user_earrned_coins + user_coins.user_spent_coins;
        setDisplayedPoints(userPoints)
    };



    createEffect(() => {
        const user_coins: UserCoinsType = {
            user_earrned_coins: user().TTFEarnedUserCoins!,
            user_spent_coins: user().TTFSpentUserCoins!
        }
        incrementPointsGradually(user_coins); // Запуск анимации очков
    });


    createEffect(() => {
        changeProgressBar(displayedPoints())
    })

    createEffect(() => {
        if (user_id() && user().LVL && user().LVL !== isLVL()) {
            const debouncedUpdateLvL = debounce((lvl: number, userId: number) => {
                updateLvL({ lvl, userId });
            }, 1000);
            debouncedUpdateLvL(isLVL(), user_id()!);

        }
        return
    })



    return (
        <div class='text-lg w-full relative border-b-2 border-solid rounded-b-2xl'>
            <div class=" text-center flex justify-between items-center p-4 ">
                <div class='
                    inline-block
                    border-solid
                    border-[0.5px]
                    rounded-[15px]
                    border-[#121214]
                    text-white
                    select-none
                    active:shadow-lg
                    duration-500
                    bg-[#121214]
                    w-auto
                    px-4
                    py-2
                    box_shadow'
                >
                    <div class='flex '>
                        <img src={initData?.user()?.photo_url ? initData?.user()?.photo_url : './AI.jpg'} alt="user logo photo" width={30} class={`group-active:scale-110 duration-500 object-contain  rounded-[50%] `} />
                        <div class={`group-active:text-shadow  duration-500 cursor-pointer pl-2 font-bold`}>
                            {user() && user().firstName && user().lastName
                                ? checkFullNameLenght(user().lastName, user().firstName)
                                    ? `${user().firstName} ${user().lastName}`
                                    : user().firstName
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
                    active:shadow-lg
                    duration-500
                   bg-[#121214]
                     w-auto
                    px-4
                    py-2
                    font-bold
                    box_shadow`}>
                    {user().LVL}
                </div>
                <div class={`
                    rounded-full
                    border-none
                    select-none
                    bg-[#00ff00]
                    active:shadow-lg
                    duration-500
                    w-auto
                    box_shadow `}>
                    <TonConnectButton />
                </div>
            </div>

            <div class="container w-[90%] text-center m-auto">
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
                text-center
                text-[#00ff00]
                select-none 
                duration-500 
                text-shadow
                w-auto
                px-4 
                py-2
                font-bold 
                group`}>
                $TTF: {displayedPoints()}
            </div>


        </div>

    )
}


import { useNavigate, useLocation } from "@solidjs/router"
import { useBackButton } from "@telegram-apps/sdk-solid";
import FriendsIcon from "./icons/users-couple-hand-drawn-outlines-svgrepo-com.svg";
import MainIcon from "./icons/rocket-hand-drawn-outline-svgrepo-com.svg";
import WalletIcon from "./icons/wallet.svg";
import { createSignal } from "solid-js";





export const Footer = () => {

    const navigate = useNavigate();
    const back_button_show = useBackButton()
    const location = useLocation();



    const goToWallet = () => {
        navigate("/wallet", { replace: true })
        back_button_show().show()
    }


    const goToFriends = () => {
        navigate("/friends", { replace: true })
        back_button_show().show()
    }

    const goToMain = () => {
        navigate("/", { replace: true })
        back_button_show().hide()
    }

    const isActive = (path: string) => location.pathname === path;

    return (
        <div class="text-white absolute bottom-0 flex h-24 w-screen justify-around items-center bg-black rounded-t-3xl">
            <div>
                <svg width={50} height={50} fill="white"
                    onClick={goToFriends}
                    class={`${isActive("/friends") && "fill-[#00ff00]"}`}
                    style={isActive("/friends") ? { filter: "drop-shadow(0px 4px 6px #00ff00)" } : {}} >
                    {FriendsIcon}
                </svg>
            </div>
            <div>
                <svg width={50} height={50} fill="white"
                    onClick={goToMain} class={`${isActive("/") && "fill-[#00ff00]  scale-105"}`}
                    style={isActive("/") ? { filter: "drop-shadow(0px 4px 6px #00ff00)" } : {}} >
                    {MainIcon}
                </svg>
            </div>
            <div>
                <svg width={50} height={50} fill="white" onClick={goToWallet}
                    class={`${isActive("/wallet") && "fill-[#00ff00] scale-105"}`}
                    style={isActive("/wallet") ? { filter: "drop-shadow(0px 4px 6px #00ff00)" } : {}} >
                    {WalletIcon}
                </svg>
            </div>

        </div>
    )
}
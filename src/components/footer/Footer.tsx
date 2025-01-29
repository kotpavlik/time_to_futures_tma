import { useNavigate, useLocation } from "@solidjs/router"
import { backButton, hapticFeedback } from "@telegram-apps/sdk-solid";
import FriendsIcon from "./icons/users-couple-hand-drawn-outlines-svgrepo-com.svg";
import MainIcon from "./icons/rocket-hand-drawn-outline-svgrepo-com.svg";
import WalletIcon from "./icons/wallet.svg";






export const Footer = () => {

    const navigate = useNavigate();
    const location = useLocation();




    const goToWallet = () => {
        hapticFeedback.impactOccurred("heavy")
        navigate("/wallet", { replace: true })
        backButton.show()
    }



    const goToFriends = () => {
        hapticFeedback.impactOccurred("heavy")
        navigate("/friends", { replace: true })
        backButton.show()
    }

    const goToMain = () => {
        hapticFeedback.impactOccurred("heavy")
        navigate("/", { replace: true })
        backButton.hide()
    }

    const isActive = (path: string) => location.pathname === path;

    return (
        <div class="text-white absolute z-10 bottom-0 flex h-24 w-screen justify-around items-center bg-black rounded-t-3xl">
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
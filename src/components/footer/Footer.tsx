import { useNavigate } from "@solidjs/router"
import { useBackButton } from "@telegram-apps/sdk-solid";





export const Footer = () => {

    const navigate = useNavigate();
    const back_button_show = useBackButton()

    const goToWallet = () => {
        navigate("/wallet", { replace: true })
        back_button_show().show()
    }

    return (
        <div class="text-white absolute bottom-0 flex h-24 w-screen justify-around items-center bg-black rounded-t-3xl">
            <div>n</div>
            <div>m</div>
            <div onClick={goToWallet}>w</div>
        </div>
    )
}
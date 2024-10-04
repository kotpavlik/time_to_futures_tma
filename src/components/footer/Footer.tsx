import { Navigate, Route, useNavigate } from "@solidjs/router"





export const Footer = () => {

    const navigate = useNavigate();

    const goToWallet = () => {
        navigate("/wallet", { replace: true })
    }

    return (
        <div class="text-white absolute bottom-0 flex h-24 w-screen justify-around items-center bg-black rounded-t-3xl">
            <div>n</div>
            <div>m</div>
            <div onClick={goToWallet}>w</div>
        </div>
    )
}
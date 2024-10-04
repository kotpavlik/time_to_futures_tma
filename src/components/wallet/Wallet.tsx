import { useNavigate, useLocation } from "@solidjs/router"

import WebApp from "@twa-dev/sdk"




export const Wallet = () => {

    const location = useLocation()
    const BackButton = WebApp.BackButton;
    const navigate = useNavigate();

    BackButton.show();

    BackButton.onClick(function () {
        BackButton.hide();
    });
    WebApp.onEvent('backButtonClicked', () => {
        navigate('/')
    })



    return (
        <div class="text-white text-4xl h-full w-screen flex flex-col pt-8 items-center">
            wallet sdfbsfdbsbs
        </div>
    )
}
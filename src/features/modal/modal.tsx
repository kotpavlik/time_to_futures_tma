import { createEffect, JSX, createSignal, type Component } from 'solid-js';
import './modal.css';

type ModalType = {
    onClose: () => void
    modal_name: string
    modal_content: () => JSX.Element
}


export const Modal: Component<ModalType> = ({ onClose, modal_name, modal_content }) => {




    return (
        <div class="fixed inset-0 bg-[#3c4a49] bg-opacity-50 flex items-center justify-center ">
            <div class={`modal-content 
                    relative
                    px-4
                    pb-[80px]
                    pt-[52px]
                    h-[90%]
                    w-[90%]
                    bg-[#121214]
                    border-solid
                    border-[0.5px]
                    shadow
                    border-[#121214]
                    shadow-[#00ff00]
                    rounded-[15px]
                      `}>
                <h2 class="bg-[#ff2b9c] text-white text-sm px-4 py-4 rounded-br-[15px] absolute top-0 left-0">{modal_name}</h2>

                <div class='h-[100%]
                    w-[100%] overflow-y-scroll'>
                    {modal_content()}

                </div>
                <button class="bg-[#00ff00] text-white px-4 py-4 rounded-bl-[15px]  absolute top-0 right-0"
                    onClick={onClose}>
                    <img width="20" height="20" src="https://img.icons8.com/external-flat-icons-inmotus-design/67/FFFFFF/external-Close-antivirus-flat-icons-inmotus-design.png" alt="external-Close-antivirus-flat-icons-inmotus-design" />
                </button>
            </div>
        </div>
    );
};
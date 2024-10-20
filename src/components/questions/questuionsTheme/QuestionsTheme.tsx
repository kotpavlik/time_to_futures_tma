
import { createSignal, Show } from "solid-js"
import { Modal } from "../../../features/modal/modal";
import { AntiHypeAbout } from "../../antihype_about/AntiHypeAbout";



export const QuestionsTheme = () => {

    const [isModalOpen, setIsModalOpen] = createSignal(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);



    return (
        <div class="text-center text-white text-xl font-bold h-[600px]  w-screen grid grid-cols-2 gap-2 p-2 pb-[120px] overflow-y-scroll">
            <div class={`
                    col-span-2
                    border-solid
                    border-[0.5px]
                    rounded-[15px]
                    border-[#121214]
                    text-white
                    select-none
                    shadow
                    active:shadow-lg
                    duration-500
                    shadow-[#00ff00]
                    active:shadow-[#00ff00]
                    bg-[#121214]
                    h-[180px]
                    overflow-hidden
                    group
                    relative`}
                onclick={openModal}>
                <img src="https://kotpavlik.github.io/time_to_futures_tma/assets/antihyp.png" alt="bg" class=" object-cover " />
                <div class="absolute top-0 w-full h-full bg-black/[.5] active:bg-black/[.05] duration-500">
                    <div class="absolute bottom-0 p-4 w-full">
                        все о Antihyip Advisor v2.0</div>
                </div>

            </div>
            <div class={`
                    border-solid
                    border-[0.5px]
                    rounded-[15px]
                    border-[#121214]
                    text-white
                    select-none
                    shadow
                    active:shadow-lg
                    duration-500
                    shadow-[#00ff00]
                    active:shadow-[#00ff00]
                    bg-[#121214]
                    h-[180px]
                    p-2
                    group`}
            >Психология рынка</div>
            <div class={`
                    border-solid
                    border-[0.5px]
                    rounded-[15px]
                    border-[#121214]
                    text-white
                    select-none
                    shadow
                    active:shadow-lg
                    duration-500
                    shadow-[#00ff00]
                    active:shadow-[#00ff00]
                    bg-[#121214]
                    h-[180px]
                    p-2
                    group`}>Теория</div>
            <div class={`
                    border-solid
                    border-[0.5px]
                    rounded-[15px]
                    border-[#121214]
                    text-white
                    select-none
                    shadow
                    active:shadow-lg
                    duration-500
                    shadow-[#00ff00]
                    active:shadow-[#00ff00]
                    bg-[#121214]
                    h-[180px]
                    p-2
                    group`}>Стратегия</div>

            <Show when={isModalOpen()}>
                <Modal
                    onClose={closeModal}
                    modal_name="Antihyip Advisor v2.0"
                    modal_content={AntiHypeAbout} />
            </Show>
        </div>

    )
}


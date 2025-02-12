
import { createSignal, Show } from "solid-js"
import { Modal } from "../../../features/modal/modal";
import { AntiHypeAbout } from "../../antihype_about/AntiHypeAbout";



export const QuestionsTheme = () => {

    const [isModalOpen, setIsModalOpen] = createSignal(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);



    return (
        <div class="text-center text-white text-xl font-bold h-full  w-screen grid grid-cols-2 gap-2 px-2 pb-[260px] pt-4 overflow-y-scroll">
            <div class={`
                    col-span-2
                    border-solid
                    border-[0.5px]
                    rounded-[15px]
                    border-[#121214]
                    text-white
                    select-none
                    bg-[#121214]
                    h-[180px]
                    overflow-hidden
                    relative 
                    box_shadow`}
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
                    bg-[#121214]
                    h-[180px]
                    p-2
                    box_shadow`}
            >Психология рынка soon</div>
            <div class={`
                    border-solid
                    border-[0.5px]
                    rounded-[15px]
                    border-[#121214]
                    text-white
                    select-none
                    bg-[#121214]
                    h-[180px]
                    p-2
                    box_shadow`}>Теория soon</div>
            <div class={`
                    border-solid
                    border-[0.5px]
                    rounded-[15px]
                    border-[#121214]
                    text-white
                    select-none
                    bg-[#121214]
                    h-[180px]
                    p-2
                    box_shadow`}>Стратегия soon</div>
            <div class={`
                    border-solid
                    border-[0.5px]
                    rounded-[15px]
                    border-[#121214]
                    text-white
                    select-none
                    bg-[#121214]
                    h-[180px]
                    p-2
                    box_shadow`}>test soon</div>
            <div class={`
                    border-solid
                    border-[0.5px]
                    rounded-[15px]
                    border-[#121214]
                    text-white
                    select-none
                    bg-[#121214]
                    h-[180px]
                    p-2
                    box_shadow`}>test soon</div>
            <div class={`
                    border-solid
                    border-[0.5px]
                    rounded-[15px]
                    border-[#121214]
                    text-white
                    select-none
                    bg-[#121214]
                    h-[180px]
                    p-2
                    box_shadow`}>test soon</div>
            <div class={`
                    border-solid
                    border-[0.5px]
                    rounded-[15px]
                    border-[#121214]
                    text-white
                    select-none
                    bg-[#121214]
                    h-[180px]
                    p-2
                    box_shadow`}>test soon</div>
            <div class={`
                    border-solid
                    border-[0.5px]
                    rounded-[15px]
                    border-[#121214]
                    text-white
                    select-none
                    bg-[#121214]
                    h-[180px]
                    p-2
                    box_shadow`}>test soon</div>



            <Show when={isModalOpen()}>
                <Modal
                    onClose={closeModal}
                    modal_name="Antihyip Advisor v2.0"
                    modal_content={AntiHypeAbout} />
            </Show>
        </div>

    )
}


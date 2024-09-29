import { QuestionsThemeEnum } from "../../../zustand/questions_store/QuestionsStore"

export const QuestionsTheme = () => {


    return (
        <div class="text-center text-white text-2xl h-full w-screen  ">
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
                    w-auto
                    px-4
                    py-2
                    m-6
                    group`}>{QuestionsThemeEnum.EXCHANGE}</div>
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
                    w-auto
                    px-4
                    py-2
                     m-6
                    group`}>{QuestionsThemeEnum.PSYCHOLOGY}</div>
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
                    w-auto
                    px-4
                    py-2
                     m-6
                    group`}>{QuestionsThemeEnum.STRATEGY}</div>
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
                    w-auto
                    px-4
                    py-2
                     m-6
                    group`}>{QuestionsThemeEnum.THEORY}</div>
        </div>
    )
}
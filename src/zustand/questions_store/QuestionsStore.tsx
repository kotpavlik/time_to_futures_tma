import { createWithSignal } from "solid-zustand";
import { immer } from "zustand/middleware/immer";
import { QuestionsApi } from "../../api/questions_api/QuestionsApi";
import { AxiosError } from "axios";
import { HandleError } from "../../features/handleError";
import { useAppStore } from "../app_store/AppStore";

export enum AnswerTypeEnum {
    CHOOSE = 'choose',
    WRITE = 'write',
    TRUEORFALSE = 'trueorfalse'
}
export enum QuestionsThemeEnum {
    EXCHANGE = 'exchange',
    THEORY = 'theory',
    PSYCHOLOGY = 'psyhology',
    STRATEGY = 'strategy'
}

export type ChooseAnswers = {
    answer: string
    successAnswer: boolean
}
export type QuestionType = {
    _id: string
    answerType: AnswerTypeEnum
    questionsTheme: QuestionsThemeEnum
    question: string
    chooseAnswers?: ChooseAnswers[]
    writeSuccessAnswer?: string
    trueOrFalse?: boolean
    TTFCoins?: number
}


export type QuestionsStoreType = {
    Questions: QuestionType[]
    initialAllQuestions: () => void
}

export const useQuestionsStore = createWithSignal<QuestionsStoreType>()(immer((set, get) => ({
    Questions: [{
        _id: '',
        answerType: AnswerTypeEnum.CHOOSE,
        question: '',
        questionsTheme: QuestionsThemeEnum.EXCHANGE,
        chooseAnswers: [],
        trueOrFalse: false,
        writeSuccessAnswer: '',
        TTFCoins: 0,
    }],
    initialAllQuestions: async () => {
        const { setStatus, setError } = useAppStore.getState()

        try {
            setStatus('loading')
            const allQuestions = await QuestionsApi.getAllQuestions()
            set(state => { state.Questions = allQuestions })
            setStatus('success')

        } catch (error) {
            const err = error as Error | AxiosError
            HandleError(err)
            setStatus("failed")
        }
    }
})))
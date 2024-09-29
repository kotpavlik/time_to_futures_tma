import { AxiosResponse } from "axios"
import { instance } from "../api"
import { QuestionType } from "../../zustand/questions_store/QuestionsStore"


export const QuestionsApi = {
    async getAllQuestions(): Promise<QuestionType[]> {
        const response: AxiosResponse<QuestionType[]> = await instance.get<QuestionType[]>('question')
        return response.data

    }
}
import { AxiosResponse } from "axios"
import { instance } from "../api"
import { QuestionType, VerifiedDataType } from "../../zustand/questions_store/QuestionsStore"


export const QuestionsApi = {
    async getAllQuestions(): Promise<QuestionType[]> {
        const response: AxiosResponse<QuestionType[]> = await instance.get<QuestionType[]>('question')
        return response.data

    },

    async setVerefied(verified_data: VerifiedDataType): Promise<QuestionType[]> {
        const response: AxiosResponse<QuestionType[]> = await instance.put<QuestionType[]>('question', { verified_data })
        console.log(response.data)
        return response.data
    }
}

import { AxiosResponse } from "axios"
import { instance } from "../api"


export const QuestionsApi = {
    async getAllQuestions(): Promise<AxiosResponse> {
        const response = await instance.get<Promise<AxiosResponse>>('question',)
        return response

    }
}
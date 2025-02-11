import { AxiosResponse } from "axios"
import { client_ton_instance } from "../api"



export const TC_See = {
    async TonClientSee() {
        const response = await client_ton_instance.get('question')
        return response.data

    },
}
// experemental 
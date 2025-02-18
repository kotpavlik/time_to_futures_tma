import { AxiosResponse } from "axios"
import { client_ton_instance } from "../api"

type see_data_params = {
    accounts: string
    operations: string
}



export const TC_See = {
    async TonClientSee(see_data: see_data_params) {
        const response = await client_ton_instance.get('transactions', { params: { see_data } })
        console.log(response)
        return response

    },
}

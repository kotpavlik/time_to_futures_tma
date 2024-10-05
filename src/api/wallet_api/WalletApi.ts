import { AxiosResponse } from "axios"
import { walletDataInstance } from "../api"
import { BalanceType } from "../../zustand/wallet_store/WalletStore"



export const walletApi = {
    async getJettons(wallet_address: string): Promise<BalanceType[]> {
        const jettons_data: AxiosResponse<BalanceType[]> = await walletDataInstance.get<BalanceType[]>(`accounts/${wallet_address}/jettons`)
        return jettons_data.data
    }
}
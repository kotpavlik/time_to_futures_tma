import { AxiosResponse } from "axios";
import { instance } from "../api";
import { CoinsDataType, UpdateLvLType, UserType } from "../../zustand/user_store/UserStore";



export const UserApi = {
    async InitialUser(user: UserType): Promise<AxiosResponse> {
        const response = await instance.post<UserType, Promise<AxiosResponse>>('check_user', user)
        return response

    },
    async UpdatePoints(coins_data: CoinsDataType): Promise<AxiosResponse> {
        const response = await instance.put<CoinsDataType, Promise<AxiosResponse>>('update_coins', coins_data)
        return response
    },
    async UpdateLvL(updateLvL_data: UpdateLvLType): Promise<AxiosResponse> {
        const response = await instance.put<UpdateLvLType, Promise<AxiosResponse>>('update_lvl', updateLvL_data)
        return response
    }
}
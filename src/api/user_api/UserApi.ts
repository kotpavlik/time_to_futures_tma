import { AxiosResponse } from "axios";
import { instance } from "../api";
import { UserType } from "../../zustand/user_store/UserStore";



export const UserApi = {
    async InitialUser(user: UserType): Promise<AxiosResponse> {

        const response = await instance.post<UserType, Promise<AxiosResponse>>('check_user', user)
        return response

    }
}
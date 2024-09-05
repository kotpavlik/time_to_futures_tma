import { createWithSignal } from 'solid-zustand'

import { UserApi } from "../../api/user_api/UserApi";
import { useAppStore } from "../app_store/AppStore";
import { HandleError } from "../../features/handleError";
import { AxiosError } from "axios";
import { immer } from 'zustand/middleware/immer';


export type UserType = {
    userId: number | null
    firstName?: string | undefined
    lastName?: string | undefined
    userName: string | undefined
    isPremium: boolean | undefined
    TTFUserCoins?: number
    TTFEarnedUserCoins?: number
    LVL?: number
    successQuestion?: number
    my_referal_link: string
    wallet_addres?: string
    authDate: string
    my_referer?: number | null
}
export type UserStateType = {
    user: UserType
    setInitialUser: (User: UserType) => void
    initialUser: (User: UserType) => void
}



export const useUserStore = createWithSignal<UserStateType>()(immer((set, get) => ({
    user: {
        authDate: '',
        firstName: '',
        isPremium: false,
        lastName: '',
        LVL: 0,
        my_referal_link: '',
        successQuestion: 0,
        TTFEarnedUserCoins: 0,
        TTFUserCoins: 0,
        userId: null,
        userName: '',
        wallet_addres: '',
        my_referer: null,
    },
    setInitialUser: (user: UserType) => set(state => {
        state.user = user;

    }),
    initialUser: async (User: UserType) => {
        try {
            const appStore = useAppStore();
            appStore().setStatus('loading');
            const UserRequest = await UserApi.InitialUser(User)
            console.log(UserRequest)
            get().setInitialUser(UserRequest.data);
            appStore().setStatus("succeeded")
        } catch (error) {
            const appStore = useAppStore();
            const err = error as Error | AxiosError
            HandleError(err)
            appStore().setStatus("failed")
        }

    }

})))
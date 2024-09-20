import { createWithSignal } from 'solid-zustand'
import { UserApi } from "../../api/user_api/UserApi";
import { HandleError } from "../../features/handleError";
import { AxiosError } from "axios";
import { immer } from 'zustand/middleware/immer';
import { useAppStore } from '../app_store/AppStore';


export type UserType = {
    userId: number | null
    firstName?: string | undefined
    lastName?: string | undefined
    userName: string | undefined
    isPremium: boolean | undefined
    TTFSpentUserCoins?: number
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
        TTFSpentUserCoins: 0,
        userId: null,
        userName: '',
        wallet_addres: '',
        my_referer: null,
    },
    initialUser: async (User: UserType) => {
        const { setStatus, setError } = useAppStore.getState()
        try {
            setStatus("loading")
            const UserRequest = await UserApi.InitialUser(User)
            set(state => { state.user = UserRequest.data })
            setStatus("success")
        } catch (error) {
            const err = error as Error | AxiosError
            HandleError(err)
            setStatus("failed")
        }

    },
    changePointsAndLVL: async (points: number) => {

    }
})))
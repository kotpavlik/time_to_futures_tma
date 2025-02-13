import { createWithSignal } from 'solid-zustand'
import { UserApi } from "../../api/user_api/UserApi";
import { HandleError } from "../../features/handleError";
import { AxiosError } from "axios";
import { immer } from 'zustand/middleware/immer';
import { useAppStore } from '../app_store/AppStore';


export type UserType = {
    _id?: string,
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
    my_ref_invite_id?: number | null
    my_referers: Array<UserType>
    wallet_addres?: string
    authDate: string
}
export type UserStateType = {
    user: UserType
    initialUser: (user: UserType) => void
    updateCoins: (coins_data: CoinsDataType) => void
    updateLvL: (lvl_data: UpdateLvLType) => void
    getReferals: (userId: number) => void
}
export type CoinsDataType = {
    coins: number
    userId: number
}
export type UpdateLvLType = {
    lvl: number
    userId: number
}

export type GetReferalsType = {
    userId: number
}



export const useUserStore = createWithSignal<UserStateType>()(immer((set, get) => ({
    user: {
        _id: '',
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
        my_referers: [],
        my_ref_invite_id: null
    },
    initialUser: async (user: UserType) => {
        const { setStatus, setError } = useAppStore.getState()
        try {
            setStatus("loading")
            const UserRequest = await UserApi.InitialUser(user)
            set(state => { state.user = UserRequest.data })
            setStatus("success")
        } catch (error) {
            const err = error as Error | AxiosError
            HandleError(err)
            setStatus("failed")
        }

    },
    updateCoins: async (coins_data: CoinsDataType) => {
        const { setStatus, setError } = useAppStore.getState()
        try {
            setStatus("loading")
            const UserRequest = await UserApi.UpdatePoints(coins_data)
            set(state => { state.user = UserRequest.data })
            setStatus("success")
        } catch (error) {
            const err = error as Error | AxiosError
            HandleError(err)
            setStatus("failed")
        }
    },
    updateLvL: async (lvl: UpdateLvLType) => {
        const { setStatus, setError } = useAppStore.getState()
        try {
            setStatus("loading")
            if (lvl.lvl > get().user.LVL!) {
                const UserRequest = await UserApi.UpdateLvL(lvl)
                if (UserRequest) {
                    set(state => { state.user = UserRequest.data })
                    setStatus("success")
                }
            }


        } catch (error) {
            const err = error as Error | AxiosError
            HandleError(err)
            setStatus("failed")
        }
    },

    getReferals: async (userId: number) => {
        const { setStatus, setError } = useAppStore.getState()
        try {
            setStatus("loading")
            if (userId) {
                const my_referals = await UserApi.GetReferals({ userId })

                if (my_referals !== undefined && my_referals.data !== undefined) {
                    set(state => { state.user.my_referers = my_referals.data })

                } else {
                    set(state => { state.user.my_referers = [] })
                }
                setStatus("success")
            }

        } catch (error) {
            const err = error as Error | AxiosError
            HandleError(err)
            setStatus("failed")
        }
    }
}
)))
import { createWithSignal } from 'solid-zustand'
import { immer } from 'zustand/middleware/immer'
import { UserType, useUserStore } from '../user_store/UserStore'
import { useQuestionsStore } from '../questions_store/QuestionsStore'
import { AxiosError } from 'axios'
import { HandleError } from '../../features/handleError'





export type StatusType = 'idle' | 'loading' | 'success' | 'failed'

type AppStateType = {
    error: null | string
    status: StatusType
    initialized: boolean
    setStatus: (status: StatusType) => void
    setError: (error: null | string) => void
    initializeApp: (user: UserType) => void
}


export const useAppStore = createWithSignal<AppStateType>()(immer((set, get) => ({
    error: null,
    status: 'success',
    initialized: false,
    setStatus: (status: StatusType) => set(state => {
        state.status = status;
    }),
    setError: (error: null | string) => set(state => {
        state.error = error;
    }),
    initializeApp: async (user: UserType) => {
        const { initialUser } = useUserStore.getState()
        const { initialAllQuestions } = useQuestionsStore.getState()
        try {
            await Promise.all([
                initialUser(user),
                initialAllQuestions()
            ]);
            set(state => { state.initialized = true })
        } catch (error) {
            const err = error as Error | AxiosError
            HandleError(err)
            set(state => { state.setStatus("failed") })
        }
    }
})))
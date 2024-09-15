import { createWithSignal } from 'solid-zustand'
import { immer } from 'zustand/middleware/immer'





export type StatusType = 'idle' | 'loading' | 'success' | 'failed'

type AppStateType = {
    error: null | string
    status: StatusType
    initialized: boolean
    setStatus: (status: StatusType) => void
    setError: (error: null | string) => void
    setInitialized: (initialazed: boolean) => void
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
    setInitialized: (initialazed: boolean) => set(state => {
        state.initialized = initialazed
    })
})))
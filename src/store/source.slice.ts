import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface State {
    source: HTMLElement | null
    root: HTMLElement | null
    router: Router
}

interface Router {
    entity: HTMLElement | null
    show: boolean
}

const initialState: State = {
    source: null,
    root: null,
    router: {
        entity: null,
        show: false
    }
}

export const sourceSlice = createSlice({
    name: 'sourceSlice',
    initialState,
    reducers: {
        captureSource(state, payload) {
            state.source = payload.payload
        },
        clearSource(state) {
            state.source = null
        },
        initialRoot(state, payload) {
            state.root = payload.payload
        },
        initiaRouter(state, { payload }) {
            state.router = {
                entity: payload,
                show: false
            }
        },
        routerShow(state) {
            state.router.entity!.style.transform = 'translateX(0%)'
            state.router.show = true
        },
        routerHide(state) {
            state.router.entity!.style.transform = 'translateX(100%)'
            state.router.show = false
        }
    }
})

export const sourceSliceAction = sourceSlice.actions

export const selectSource = (state: RootState) => state.sourceElement.source
export const selectRoot = (state: RootState) => state.sourceElement.root
export const selectRouter = (state: RootState) => state.sourceElement.router
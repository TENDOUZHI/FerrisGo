import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface State {
    source: HTMLElement | null
    root: HTMLElement | null
}

const initialState: State = {
    source: null,
    root: null
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
        }
    }
})

export const sourceSliceAction = sourceSlice.actions

export const selectSource = (state: RootState) => state.sourceElement.source
export const selectRoot = (state: RootState) => state.sourceElement.root
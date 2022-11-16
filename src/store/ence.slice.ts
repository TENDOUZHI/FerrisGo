import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface Ence {
    enceLen: number
}

const initialState: Ence = {
    enceLen: 0
}

export const enceSlice = createSlice({
    name: 'enceSlice',
    initialState,
    reducers: {
        capEneLen(state, { payload }) {
            state.enceLen = payload
        }
    }
})

export const enceSliceAction = enceSlice.actions

export const selectEnce = (state: RootState) => state.enceElement
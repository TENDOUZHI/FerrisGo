import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { VNode } from "./ast";

interface Ence {
    enceList: Array<cusEl>
    enceLen: number
}

export interface cusEl {
    id: number,
    name: string,
    vnode: VNode
}

const initialState: Ence = {
    enceList: [],
    enceLen: 0
}

export const enceSlice = createSlice({
    name: 'enceSlice',
    initialState,
    reducers: {
        initialList(state, { payload }) {
            state.enceList = payload
        },
        capEneLen(state, { payload }) {
            state.enceLen = payload
        }
    }
})

export const enceSliceAction = enceSlice.actions

export const selectEnce = (state: RootState) => state.enceElement
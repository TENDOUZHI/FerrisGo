import { createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { RootState } from ".";

interface JumpLayer {
    title: string
    show: boolean
    certainFn: (() => void) | null
    children: ReactNode | null
}

const initialState: JumpLayer = {
    title: '',
    show: false,
    certainFn: null,
    children: null
}

export const jumplayerSlice = createSlice({
    name: 'jumplayerSlice',
    initialState,
    reducers: {
        setShow(state) {
            state.show = true
        },
        setHide(state) {
            state.show = false
        },
        setTitle(state,{payload}){
            state.title = payload
        },
        capCertainFn(state, { payload }) {
            state.certainFn = payload
        },
        capChildren(state, { payload }) {
            state.children = payload
        }
    }
})

export const jumplayerSliceAction = jumplayerSlice.actions

export const selectJumpLayer = (state: RootState) => state.jumplayerElement
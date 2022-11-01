import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import defaultImg from '@/assets/default.png'
import { enableMapSet } from 'immer'

export interface ImageState {
    src: Map<string, string>
}

const initialState: ImageState = {
    src: new Map().set('default', defaultImg)
}

export const imageSlice = createSlice({
    name: 'imageSlice',
    initialState,
    reducers: {
        updateSrc(state, { payload }) {
            enableMapSet()
            state.src.set(payload.className, payload.src)
        }
    }
})

export const imageSliceAction = imageSlice.actions

export const selectImage = (state: RootState) => state.imageElement

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import defaultImg from '@/assets/default.png'

export interface State {
    src: string
}

const initialState: State = {
    src: defaultImg
}

export const imageSlice = createSlice({
    name: 'imageSlice',
    initialState,
    reducers: {
        updateSrc(state, { payload }) {
            state.src = payload.src
        }
    }
})

export const imageSliceAction = imageSlice.actions

export const selectImage = (state: RootState) => state.imageElement

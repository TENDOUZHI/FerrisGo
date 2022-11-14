import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface Paste {
    glue: HTMLElement | null
}

const initialState: Paste = {
    glue: null
}

export const pasteSlice = createSlice({
    name: 'pasteSlice',
    initialState,
    reducers: {
        stickElement(state, { payload }) {
            state.glue = payload
        }
    }
})

export const pasteSliceAction = pasteSlice.actions

export const selectPaste = (state: RootState) => state.pasteElement.glue
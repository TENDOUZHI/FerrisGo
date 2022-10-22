import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface State {
    type: 'warn' | 'correct' | 'error',
    show: boolean,
    text: string
}

const initialState: State = {
    type: 'correct',
    show: false,
    text: ''
}

export const messageSlice = createSlice({
    name: 'messageSlice',
    initialState,
    reducers: {
        setError(state, payload) {
            state.type = 'error'
            state.text = payload.payload
            state.show = true
        },
        setCorrect(state, payload){
            state.type = 'correct'
            state.text = payload.payload
            state.show = true
        },
        setWarn(state, payload){
            state.type = 'warn'
            state.text = payload.payload
            state.show = true
        },
        setHide(state){
            state.show = false
        }
    }
})

export const messageSliceAction = messageSlice.actions

export const selectMessage = (state: RootState) => state.messageElement

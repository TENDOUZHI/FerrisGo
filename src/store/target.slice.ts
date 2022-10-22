import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface State {
    target: HTMLElement | null,
    delete: boolean,
    layer: HTMLElement | null
}

const initialState: State = {
    target: null,
    delete: true,
    layer: null
}

export const targetSlice = createSlice({
    name: 'targetSlice',
    initialState,
    reducers: {
        captureTarget(state, payload) {
            state.target = payload.payload
        },
        updateState(state, payload) {
            state.delete = payload.payload
        },
        initialLayer(state, payload) {
            state.layer = payload.payload
        },
        stateLayer(state, payload) {
            // true or false
            // if(payload.payload) {
            //    state.layer?.setAttribute('style', 'display:block;')
            // } else {
            //     state.layer?.setAttribute('style', 'display:none;') 
            // }
            
        }
    }
})

export const targetSliceAction = targetSlice.actions

export const selectTarget = (state: RootState) => state.targetElement.target
export const selectState = (state: RootState) => state.targetElement.delete
export const selectLayer = (state: RootState) => state.targetElement.layer
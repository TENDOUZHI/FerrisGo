import { createSlice, current } from "@reduxjs/toolkit";
import { RootState } from ".";
interface State {
    ws: WebSocket | null
}

const initialState: State = {
    ws: null
}

export const wsSlice = createSlice({
    name:'wsSlice',
    initialState,
    reducers:{
        initialWs(state,payload) {
            state.ws = payload.payload
        }
    }
})

export const wsSliceAction = wsSlice.actions

export const selectWs = (state: RootState) => state.wsElemeent.ws
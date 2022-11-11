import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface Block {
    block: boolean
}

const initialState: Block = {
    block: false
}

export const blockSlice = createSlice({
    name: 'blockSlice',
    initialState,
    reducers:{
        setBlock(state){
            state.block = true
        },
        stopBlock(state) {
            state.block = false
        }
    }
})

export const blockSliceAction = blockSlice.actions

export const selectBlock = (state: RootState) => state.blockElement
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { enableMapSet } from 'immer'
import { Vapp, VNode } from "./ast";

interface Undo {
    history: Set<VNode>,
    previous: VNode | null,
    cache: VNode | null
}

const initialState: Undo = {
    history: new Set(),
    previous: null,
    cache: null
}

export const undoSlice = createSlice({
    name: 'undoSlice',
    initialState,
    reducers: {
        newdo(state, { payload }) {
            enableMapSet()
            state.history.add(state.cache as VNode)
            state.cache = payload
            // state.previpus = payload
        },
        undo(state) {
            enableMapSet()
            // state.previous = state.history.
            // state.history.add(1)
        }
    }
})

export const undoSliceAction = undoSlice.actions

export const selectUndo = (state: RootState) => state.undoElement
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface Cache {
    last_path: string
}

const initialState: Cache = {
    last_path: ''
}

export const cacheSlice = createSlice({
    name: 'cacheSlice',
    initialState,
    reducers: {
        initialLastPath(state, { payload }) {
            state.last_path = payload
        }
    }
})

export const cacheSliceAction = cacheSlice.actions

export const selectCache = (state: RootState) => state.cahceElement
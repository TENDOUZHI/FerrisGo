import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { enableMapSet } from 'immer'

interface State {
    icon: Map<string, iconValue>
}

export interface iconValue {
    type: string,
    size: number
}

const initialState: State = {
    icon: new Map()
}

export const iconSlice = createSlice({
    name: 'iconSlice',
    initialState,
    reducers:{
        
    }
})
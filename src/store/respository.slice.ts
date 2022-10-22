import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface Item {
    id: number,
    name: string,
    lastdate: string
}

export interface ProgramInsert {
    user_id: number,
    name: string,
    lastdate: string
}

export interface ProgramDelete {
    id:number,
    user_id: number,
}

interface State {
    list: Array<Item>
}


const initialState: State = {
    list: []
}

export const repSlice = createSlice({
    name: 'repSlice',
    initialState,
    reducers: {
        synListData(state, payload) {
            // const item: Item = {
            //     id: payload.payload.id,
            //     name: payload.payload.name,
            //     lastDate: payload.payload.lastDate
            // }
            const list = payload.payload
            state.list = list
        },
        appendData(state, payload) {
            const item: Item = {
                id: payload.payload.id,
                name: payload.payload.name,
                lastdate: payload.payload.lastdate
            }
            state.list.push(item)
        }
    }
})

export const repSliceAction = repSlice.actions

export const selectList = (state: RootState) => state.repElement.list
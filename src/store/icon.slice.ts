import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { enableMapSet } from 'immer'

export interface Icon {
    content: Map<string, iconValue>
}

export interface iconValue {
    type: string,
    size: string
}

const initialState: Icon = {
    content: new Map<string, iconValue>().set('default', { type: 'success', size: '93' })
}

export const iconSlice = createSlice({
    name: 'iconSlice',
    initialState,
    reducers: {
        updateIconType(state, { payload }) {
            enableMapSet()
            let classes = payload.className
            if(state.content.get(classes)===undefined){
                classes = 'default'
            }
            state.content.set(payload.className, {
                type: payload.type,
                size: state.content.get(classes)!.size
            })
        },
        updateIconSize(state, { payload }) {
            enableMapSet()
            let classes = payload.className
            if(state.content.get(classes)===undefined){
                classes = 'default'
            }
            state.content.set(payload.className, {
                type: state.content.get(classes)!.type,
                size: payload.size
            })
        }
    }
})

export const iconSliceAction = iconSlice.actions

export const selectIcon = (state: RootState) => state.iconElement
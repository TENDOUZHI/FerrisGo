import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { enableMapSet } from 'immer'

export interface IconState {
    content: Map<string, iconValue>
}

export interface iconValue {
    icon_type: string,
    icon_size: string
}

const initialState: IconState = {
    content: new Map<string, iconValue>().set('default', { icon_type: 'success', icon_size: '93' })
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
                icon_type: payload.type,
                icon_size: state.content.get(classes)!.icon_size
            })
        },
        updateIconSize(state, { payload }) {
            enableMapSet()
            let classes = payload.className
            if(state.content.get(classes)===undefined){
                classes = 'default'
            }
            state.content.set(payload.className, {
                icon_type: state.content.get(classes)!.icon_type,
                icon_size: payload.size
            })
        }
    }
})

export const iconSliceAction = iconSlice.actions

export const selectIcon = (state: RootState) => state.iconElement
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface RouterEl {
    elList: Array<HTMLElement>
}

const initialState: RouterEl = {
    elList: []
}

export const routerElSlice = createSlice({
    name: 'routerElSlice',
    initialState,
    reducers: {
        scheduleList(state, { payload }) {
            state.elList.push(payload)
        },
        flushList(state, { payload }) {
            for (let i = 0; i < state.elList.length; i++) {
                const el = state.elList.pop() as HTMLElement
                const id = el?.getAttribute('data-routerid') as string
                const router = el?.getAttribute('data-router')
                el.addEventListener('mousedown', (e: MouseEvent) => {
                    if (e.button === 1) payload(parseInt(id), router)
                })
            }
        }
    }
})

export const routerElSliceAction = routerElSlice.actions

export const selectRouterEl = (state: RootState) => state.routerElElement.elList
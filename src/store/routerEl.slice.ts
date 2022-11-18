import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface RouterEl {
    elList: Array<HTMLElement>,
    router: boolean,
    routerStack: Array<Route>
}

interface Route {
    id: number,
    name: string
}

const initialState: RouterEl = {
    elList: [],
    router: false,
    routerStack: []
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
                const router = el?.getAttribute('data-router') as string
                el.addEventListener('mousedown', (e: MouseEvent) => {
                    if (e.button === 1) {
                        payload(parseInt(id), router,true)
                        console.log(22);
                    }

                })
            }
        },
        setShow(state) {
            state.router = true
        },
        back(state) {
            state.routerStack.pop()
            state.router = false
        },
        newRoute(state, { payload }) {
            state.routerStack.push({
                id: payload.id,
                name: payload.name
            })
        }
    }
})

export const routerElSliceAction = routerElSlice.actions

export const selectRouterEl = (state: RootState) => state.routerElElement.elList

export const selectRouterShow = (state: RootState) => state.routerElElement.router

export const selectRouterStack = (state: RootState) => state.routerElElement.routerStack
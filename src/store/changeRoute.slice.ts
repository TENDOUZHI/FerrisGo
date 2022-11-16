import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface ChangeRoute {
    changeRoute: ((id: number, name: string) => void) | null
}

const initialState: ChangeRoute = {
    changeRoute: null
}

export const changeRouteSlice = createSlice({
    name: 'changeRouteSlice',
    initialState,
    reducers: {
        initialChangeRoute(state, { payload }) {
            state.changeRoute = payload
        }
    }
})

export const changeRouteSliceAction = changeRouteSlice.actions

export const selectChangeRoute = (state: RootState) => state.changeRouteElement.changeRoute
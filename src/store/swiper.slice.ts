import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface SwiperItem {
    
}

export interface SwiperRedux {
    autoPlay: boolean,
    autoPlayDelay: number,
    pagination: boolean,
    scrollbar: boolean,
    items: Array<SwiperItem>
}

export type SwiperType = 'autoPlay' | 'pagination' | 'scrollbar'

const initialState: SwiperRedux = {
    autoPlay: false,
    autoPlayDelay: 2000,
    pagination: false,
    scrollbar: false,
    items: []
}

export const swiperSlice = createSlice({
    name: 'swiperSlice',
    initialState,
    reducers: {
        setAutoPlay(state, payload) {
            state.autoPlay = payload.payload
        },
        setAutoPlayDelay(state, { payload }) {
            state.autoPlayDelay = payload
        },
        setPagination(state, { payload }) {
            state.pagination = payload
        },
        setScrollBar(state, { payload }) {
            state.scrollbar = payload
        }
    }
})

export const swiperSliceAction = swiperSlice.actions

export const selectSwiper = (state: RootState) => state.swiperElement
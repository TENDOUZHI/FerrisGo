import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import file from '@/assets/file.png'

export interface SwiperItem {
    id: number
    content: string
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
    items: [
        { id: 0, content: file },
        { id: 1, content: file },
        { id: 2, content: file }
    ]
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
        },
        setContent(state, { payload }) {
            state.items[payload.id].content = payload.content
        }
    }
})

export const swiperSliceAction = swiperSlice.actions

export const selectSwiper = (state: RootState) => state.swiperElement
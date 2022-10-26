import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import defaultImg from '@/assets/default.png'

export interface SwiperItem {
    id: number
    content: string
    status: boolean
}

export interface SwiperRedux {
    autoPlay: boolean,
    autoPlayDelay: number,
    pagination: boolean,
    scrollbar: boolean,
    items: Array<SwiperItem>,
    garbage: number
}


export type SwiperType = 'autoPlay' | 'pagination' | 'scrollbar'

const initialState: SwiperRedux = {
    autoPlay: false,
    autoPlayDelay: 2000,
    pagination: false,
    scrollbar: false,
    items: [
        { id: 0, content: defaultImg, status: true },
        { id: 1, content: defaultImg, status: true },
        { id: 2, content: defaultImg, status: true }
    ],
    garbage: 0
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
        },
        appendContent(state) {
            const item: SwiperItem = {
                id: state.items.length,
                content: defaultImg,
                status: true
            }
            state.items.push(item)
        },
        deleteItem(state, { payload }) {
            state.items[payload.id].status = false
            state.garbage += 1
        }
    }
})

export const swiperSliceAction = swiperSlice.actions

export const selectSwiper = (state: RootState) => state.swiperElement
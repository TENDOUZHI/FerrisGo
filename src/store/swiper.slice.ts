import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import defaultImg from '@/assets/default.png'

export interface SwiperItem {
    id: number
    content: string
    status: boolean
}

export interface SwiperRedux {
    auto_play: boolean,
    auto_play_delay: string,
    pagination: boolean,
    scrollbar: boolean,
    items: Array<SwiperItem>,
    garbage: number
}


export type SwiperType = 'auto_play' | 'pagination' | 'scrollbar'

const initialState: SwiperRedux = {
    auto_play: false,
    auto_play_delay: '2000',
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
            state.auto_play = payload.payload
        },
        setAutoPlayDelay(state, { payload }) {
            state.auto_play_delay = payload
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
        },
        retriveSwiper(state, { payload }) {
            state.auto_play = payload.autoplay
            state.auto_play_delay = payload.autoplayDelay
            state.pagination = payload.pagination
            state.scrollbar = payload.scrollbar
            state.items = payload.items
            state.garbage = payload.garbage
        }
    }
})

export const swiperSliceAction = swiperSlice.actions

export const selectSwiper = (state: RootState) => state.swiperElement
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";


export interface Navigator {
    tab_bar: HTMLElement | null
    navigater: Nav
}

interface Nav {
    tab_bar_status: boolean
    font_color: string
    selected_color: string
    border_color: string
    items: Array<NavItem>
}

interface NavItem {
    id: number
    icon: string | null
    selected_icon: string | null
    text: string
    path: string
    status: boolean
    select_status: boolean
}

const initialState: Navigator = {
    tab_bar: null,
    navigater: {
        tab_bar_status: false,
        font_color: '#a9b7b7',
        selected_color: '#11cd6e',
        border_color: '#fff',
        items: [
            {
                id: 0,
                icon: null,
                selected_icon: null,
                text: '首页',
                path: '',
                status: true,
                select_status: true
            },
            {
                id: 1,
                icon: null,
                selected_icon: null,
                text: '购物车',
                path: '',
                status: true,
                select_status: false
            }
        ]
    }
}

export const navigatorSlice = createSlice({
    name: 'navigatorSlice',
    initialState,
    reducers: {
        retriveNavigatpr(state, { payload }) {
            state.navigater = payload
        },
        initialTabBar(state, { payload }) {
            state.tab_bar = payload
        },
        updateTabBarStatus(state, { payload }) {
            state.navigater.tab_bar_status = payload
        },
        newItem(state) {
            const item: NavItem = {
                id: state.navigater.items.length,
                icon: null,
                selected_icon: null,
                text: '首页',
                path: '',
                status: true,
                select_status: false
            }
            state.navigater.items.push(item)
        },
        updateText(state, { payload }) {
            payload.forEach((item: string, i: number) => {
                state.navigater.items[i].text = item
            });
        },
        updateColor(state, { payload }) {
            state.navigater.font_color = payload
        },
        updateSelectedColor(state, { payload }) {
            state.navigater.selected_color = payload
        },
        updateSelectedStatue(state, { payload }) {
            state.navigater.items.forEach(item => {
                if (item.id === payload) item.select_status = true
                else item.select_status = false
            })
        },
        onChangeText(state, { payload }) {
            state.navigater.items.forEach(item => {
                if (item.id === payload.id) item.text = payload.text
            })
        },
        updatePath(state, { payload }) {
            state.navigater.items.forEach(item => {
                if (item.id === payload.id) item.path = payload.path
            })
        },
        updateIcon(state, { payload }) {
            state.navigater.items.forEach(item => {
                if (item.id === payload.id) item.icon = payload.icon
            })
        },
        updateSelectedIcon(state, { payload }) {
            state.navigater.items.forEach(item => {
                if (item.id === payload.id) item.selected_icon = payload.selectedIcon
            })
        }
    }
})

export const navigatorSliceAction = navigatorSlice.actions

export const selectNav = (state: RootState) => state.navigatorElement.navigater
export const selectTabBar = (state: RootState) => state.navigatorElement.tab_bar
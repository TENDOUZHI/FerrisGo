import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";


export interface Navigator {
    tab_bar: HTMLElement | null
    navigator: Nav
}

export interface Nav {
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
    navigator: {
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
        retriveNavigator(state, { payload }) {
            state.navigator = payload
        },
        initialTabBar(state, { payload }) {
            state.tab_bar = payload
        },
        updateTabBarStatus(state, { payload }) {
            state.navigator.tab_bar_status = payload
        },
        newItem(state) {
            const item: NavItem = {
                id: state.navigator.items.length,
                icon: null,
                selected_icon: null,
                text: '首页',
                path: '',
                status: true,
                select_status: false
            }
            state.navigator.items.push(item)
        },
        updateText(state, { payload }) {
            payload.forEach((item: string, i: number) => {
                state.navigator.items[i].text = item
            });
        },
        updateColor(state, { payload }) {
            state.navigator.font_color = payload
        },
        updateSelectedColor(state, { payload }) {
            state.navigator.selected_color = payload
        },
        updateSelectedStatue(state, { payload }) {
            state.navigator.items.forEach(item => {
                if (item.id === payload) item.select_status = true
                else item.select_status = false
            })
        },
        onChangeText(state, { payload }) {
            state.navigator.items.forEach(item => {
                if (item.id === payload.id) item.text = payload.text
            })
        },
        updatePath(state, { payload }) {
            state.navigator.items.forEach(item => {
                if (item.id === payload.id) item.path = payload.path
            })
        },
        updateIcon(state, { payload }) {
            state.navigator.items.forEach(item => {
                if (item.id === payload.id) item.icon = payload.icon
            })
        },
        updateSelectedIcon(state, { payload }) {
            state.navigator.items.forEach(item => {
                if (item.id === payload.id) item.selected_icon = payload.selectedIcon
            })
        }
    }
})

export const navigatorSliceAction = navigatorSlice.actions

export const selectNav = (state: RootState) => state.navigatorElement.navigator
export const selectTabBar = (state: RootState) => state.navigatorElement.tab_bar
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";


interface Navigator {
    tabBar: HTMLElement | null
    tabBarStatus: boolean
    fontColor: string
    selectedColor: string
    borderColor: string
    items: Array<NavItem>
}
interface NavItem {
    id: number
    icon: ImageData | null
    selectedIcon: ImageData | null
    text: string
    path: string
}

const initialState: Navigator = {
    tabBar: null,
    tabBarStatus: false,
    fontColor: '#fff',
    selectedColor: '#fff',
    borderColor: '#fff',
    items: [
        {   
            id: 0,
            icon: null,
            selectedIcon: null,
            text: '首页',
            path: ''
        },
        {   
            id: 1,
            icon: null,
            selectedIcon: null,
            text: '首页',
            path: ''
        }
    ]
}

export const navigatorSlice = createSlice({
    name: 'navigatorSlice',
    initialState,
    reducers: {
        initialTabBar(state, { payload }) {
            state.tabBar = payload
        },
        newItem(state) {
            const item: NavItem = {
                id: state.items.length,
                icon: null,
                selectedIcon: null,
                text: '首页',
                path: ''
            }
            state.items.push(item)
        }
    }
})

export const navigatorSliceAction = navigatorSlice.actions

export const selectNav = (state: RootState) => state.navigatorElement
export const selectTabBar = (state: RootState) => state.navigatorElement.tabBar
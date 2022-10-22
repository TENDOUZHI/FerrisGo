import { useAutoSave } from "@/hooks/useAutoSave";
import { createSlice, current } from "@reduxjs/toolkit";
import { RootState } from ".";
import avatar from '@/assets/avatar.png'
export interface User {
    id: number
    username: string,
    avatar: any,
    email: string,
    telephone: string,
    token: string,
    isLogin: boolean
}

const initialState: User = {
    id: 0,
    username: "",
    avatar: avatar,
    email: "",
    telephone: "",
    token: "",
    isLogin: false
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        synUserData(state,payload) {
            const data = payload.payload
            state.id = data.id
            state.username = data.username
            state.avatar = null ?  avatar :data.avatar
            state.email = data.email
            state.telephone = data.telephone
            state.token = data.token
            state.isLogin = data.isLogin
        },
        logout(state) {
            state.id = 0
            state.username = ''
            state.avatar = null
            state.email = ''
            state.telephone = ''
            state.token = ''
            state.isLogin = false
            localStorage.setItem('user',JSON.stringify(state))
        }
    }
})

export const userSliceAction = userSlice.actions

export const selectUser = (state: RootState) => state.userElement
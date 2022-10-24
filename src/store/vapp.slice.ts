import { useAutoSave } from "@/hooks/useAutoSave";
import { useSendWs } from "@/hooks/useSendWs";
import { createSlice, current } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Routes, Vapp, VNode } from "./ast";



interface State {
    current: {
        id: number,
        name: string
    },
    maxSize: number,
    program_id: number,
    Vapp: Vapp,
    Wapp: Vapp
}

const initialState: State = {
    current: {
        id: 0,
        name: 'index'
    },
    maxSize: 0,
    program_id: 0,
    Vapp: {
        project_name: 'New Project',
        routes: [
            {
                id: 0,
                name: 'index',
                state: 0,
                size: 0,
                vnode: {
                    name: 'root',
                    class: '',
                    tag_name: 'div',
                    style: null,
                    props: null,
                    content: null,
                    children: []
                }
            }
        ]
    },
    Wapp: {
        project_name: 'New Project',
        routes: [
            {
                id: 0,
                name: 'index',
                state: 0,
                size: 0,
                vnode: {
                    name: 'root',
                    class: '',
                    tag_name: 'div',
                    props: null,
                    style: null,
                    content: null,
                    children: []
                }
            }
        ]
    },
}

export const routesSlice = createSlice({
    name: 'routesSlice',
    initialState,
    reducers: {
        appendRoutes(state, payload) {
            const vNode: VNode = {
                name: 'root',
                class: '',
                tag_name: 'div',
                props: null,
                style: null,
                content: null,
                children: []
            }
            state.maxSize += 1
            const route: Routes = {
                id: state.maxSize,
                name: payload.payload.name,
                state: 0,
                size: 0,
                vnode: vNode
            }
            state.Vapp.routes.push(route)
            state.Wapp.routes.push(route)
            localStorage.setItem('size', JSON.stringify(state.maxSize))
            useAutoSave(state.Vapp, state.Wapp)
            useSendWs(state.Wapp, payload.payload.user_id, payload.payload.program_id, payload.payload.ws)
        },
        deleteRoute(state, payload) {
            state.Wapp.routes.splice(payload.payload.id, 1)
            state.Vapp.routes[payload.payload.id].state = -1
            useAutoSave(state.Vapp, state.Wapp, state.maxSize)
            useSendWs(state.Wapp, payload.payload.user_id, payload.payload.program_id, payload.payload.ws)
        },
        updateVnode(state, payload) {
            state.Vapp.routes.forEach((route: Routes) => {
                if (route.id === payload.payload.curVnode.id) {
                    route.vnode = payload.payload.curVnode.vNode
                }
            })
            state.Wapp.routes.forEach((route: Routes) => {
                if (route.id === payload.payload.curWnode.id) {
                    route.vnode = payload.payload.curWnode.vNode
                }
            })
            // localStorage.setItem('size', JSON.stringify(state.maxSize))
            useAutoSave(state.Vapp, state.Wapp, state.maxSize)
            useSendWs(state.Wapp, payload.payload.user_id, payload.payload.program_id, payload.payload.ws)
        },
        changeRoutes(state, payload) {
            state.current = payload.payload
        },
        retriveDom(state) {
            const Vjson = localStorage.getItem('vapp')
            const Wjson = localStorage.getItem('wapp')
            state.Vapp = JSON.parse(Vjson as string)
            state.Wapp = JSON.parse(Wjson as string)
        },
        retriveSize(state) {
            const size = localStorage.getItem('size')
            state.maxSize = JSON.parse(size as string)
        },
        updateProjectName(state, payload) {
            state.Vapp.project_name = payload.payload.title
            state.Wapp.project_name = payload.payload.title
            useAutoSave(state.Vapp, state.Wapp, state.maxSize)
            useSendWs(state.Wapp, payload.payload.user_id, payload.payload.program_id, payload.payload.ws)
        },
        updateRouteName(state, payload) {
            for (let i = 0; i < state.Vapp.routes.length; i++) {
                if (state.Vapp.routes[i].id === payload.payload.id) {
                    state.Vapp.routes[i].name = payload.payload.name
                    state.Wapp.routes[i].name = payload.payload.name
                }
            }
            // state.Vapp.routes[payload.payload.id].name = payload.payload.name
            // state.Wapp.routes[payload.payload.id].name = payload.payload.name
            useAutoSave(state.Vapp, state.Wapp)
            useSendWs(state.Wapp, payload.payload.user_id, payload.payload.program_id, payload.payload.ws)
        },
        updateRouteSize(state, payload) {
            state.Vapp.routes[payload.payload.id].size = payload.payload.size
            state.Wapp.routes[payload.payload.id].size = payload.payload.size
            useAutoSave(state.Vapp, state.Wapp)
            // useSendWs(state.Wapp, payload.payload.user_id, payload.payload.program_id, payload.payload.ws)
        },
        initialProgramId(state, payload) {
            state.program_id = payload.payload
        }
    }
})

export const routesSliceAction = routesSlice.actions

export const selectRoutes = (state: RootState) => state.routesElement.Vapp.routes
export const selectCurRoutes = (state: RootState) => state.routesElement.current
export const selectVapp = (state: RootState) => state.routesElement.Vapp
export const selectWapp = (state: RootState) => state.routesElement.Wapp
export const selectRouteSize = (state: RootState) => state.routesElement.maxSize
export const selectProgramId = (state: RootState) => state.routesElement.program_id
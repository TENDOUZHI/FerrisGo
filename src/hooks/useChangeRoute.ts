import { VNode } from "@/store/ast"
import { selectChangeRoute } from "@/store/changeRoute.slice"
import { selectDevice } from "@/store/device.slice"
import { routerElSliceAction } from "@/store/routerEl.slice"
import { selectRoot, selectRouter, sourceSliceAction } from "@/store/source.slice"
import { routesSliceAction, selectCurRoutes, selectRoutes } from "@/store/vapp.slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useCompile } from "./useCompile"
import { useRenderer } from "./useRenderer"
import { useVprops } from "./useVprops"

export const useChangeRoute = (): ((id: number, name: string, router?: boolean) => void) => {
    const dispatch = useDispatch()
    const route = useSelector(selectRoutes)
    const root = useSelector(selectRoot)
    const routerEntity = useSelector(selectRouter).entity
    const device = useSelector(selectDevice)
    const current = useSelector(selectCurRoutes)
    const vprops = useVprops()
    // console.log(current);

    const changeRoute = (id: number, name: string, router?: boolean): void => {
        if (router) {
            dispatch(sourceSliceAction.routerShow())
            // console.log(current);
            // dispatch(routerElSliceAction.newRoute({
            //     id: current.id,
            //     name: current.name
            // }))
            // dispatch(routerElSliceAction.setShow())
        } else {
            dispatch(sourceSliceAction.routerHide())
        }
        // update vNode before switch route
        updateVNode()
        // switch route
        setTimeout(() => {
            switchRoute(id, name, true)
        })

    }
    const updateVNode = () => {
        const curVnode = {
            id: current.id,
            vNode: useCompile(root, device.width, false, vprops)
        }
        const curWnode = {
            id: current.id,
            vNode: useCompile(root, device.width, true, vprops)
        }

        dispatch(routesSliceAction.updateVnode({
            curVnode, curWnode,
            user_id: '',
            program_id: '',
            ws: ''
        }))
    }
    const switchRoute = (id: number, name: string, router?: boolean) => {
        // judge whether user click cur route
        // if is nothing changed
        if (id !== current.id) {
            // render dom
            try {
                // console.log(name,id);
                if (router) {
                    const len = routerEntity?.childNodes.length as number
                    const childs = routerEntity?.childNodes
                    // clear main display
                    for (let i = len - 1; i >= 0; i--) {
                        // @ts-ignore
                        routerEntity?.removeChild(childs[i])
                    }
                    useRenderer(routerEntity as HTMLElement, route[id].vnode as VNode, dispatch, vprops, changeRoute)
                } else {
                    const len = root?.childNodes.length as number
                    const childs = root?.childNodes
                    // clear main display
                    for (let i = len - 1; i >= 0; i--) {
                        // @ts-ignore
                        root?.removeChild(childs[i])
                    }
                    console.log('root');
                    dispatch(routesSliceAction.changeRoutes({ name, id }))
                    useRenderer(root as HTMLElement, route[id].vnode as VNode, dispatch, vprops, changeRoute)
                }

            } catch (error) { }

        }
    }

    return changeRoute
}
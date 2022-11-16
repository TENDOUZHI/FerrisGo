import { VNode } from "@/store/ast"
import { selectDevice } from "@/store/device.slice"
import { selectRoot } from "@/store/source.slice"
import { routesSliceAction, selectCurRoutes, selectRoutes } from "@/store/vapp.slice"
import { useDispatch, useSelector } from "react-redux"
import { useCompile } from "./useCompile"
import { useRenderer } from "./useRenderer"
import { useVprops } from "./useVprops"

export const useChangeRoute = (): ((id: number, name: string) => void) => {
    const dispatch = useDispatch()
    const route = useSelector(selectRoutes)
    const root = useSelector(selectRoot)
    const device = useSelector(selectDevice)
    const current = useSelector(selectCurRoutes)
    const vprops = useVprops()
    const changeRoute = (id: number, name: string): void => {
        // update vNode before switch route
        updateVNode()
        // switch route
        switchRoute(id, name)

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
    const switchRoute = (id: number, name: string) => {
        const len = root?.childNodes.length as number
        const childs = root?.childNodes
        // judge whether user click cur route
        // if is nothing changed
        if (id !== current.id) {
            // clear main display
            for (let i = len - 1; i >= 0; i--) {
                // @ts-ignore
                root?.removeChild(childs[i])
            }
            // render dom
            try {
                dispatch(routesSliceAction.changeRoutes({ name, id }))
                useRenderer(root as HTMLElement, route[id].vnode as VNode, dispatch, vprops, changeRoute)
            } catch (error) { }

        }
    }

    return changeRoute
}
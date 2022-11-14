import { selectDevice } from "@/store/device.slice"
import { selectRoot } from "@/store/source.slice"
import { selectTarget } from "@/store/target.slice"
import { selectVapp, selectCurRoutes, routesSliceAction } from "@/store/vapp.slice"
import { invoke } from "@tauri-apps/api"
import { useSelector, useDispatch } from "react-redux"
import { useCompile } from "./useCompile"
import { useVprops } from "./useVprops"

export const useDeleteEl = () => {
    const Vapp = useSelector(selectVapp)
    const dispatch = useDispatch()
    const current = useSelector(selectCurRoutes)
    const root = useSelector(selectRoot)
    const device = useSelector(selectDevice)
    const vprops = useVprops()
    const target = useSelector(selectTarget)

    const deleteEl = () => {
        invoke('save_operate', { newOperate: Vapp.routes[current.id].vnode })
        target?.remove()
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

    return deleteEl
}
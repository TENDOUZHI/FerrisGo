import { selectDevice } from "@/store/device.slice"
import { pasteSliceAction, selectPaste } from "@/store/paste.slice"
import { selectRoot } from "@/store/source.slice"
import { selectTarget } from "@/store/target.slice"
import { selectCurRoutes, routesSliceAction } from "@/store/vapp.slice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useCompile } from "./useCompile"
import { useUpdate } from "./useUpdate"
import { useVprops } from "./useVprops"

export const usePaste = () => {
    const dispatch = useDispatch()
    const target = useSelector(selectTarget)
    const element = useSelector(selectPaste)
    const update = useUpdate()
    const current = useSelector(selectCurRoutes)
    const root = useSelector(selectRoot)
    const device = useSelector(selectDevice)
    const vprops = useVprops()

    const copy = () => {
        dispatch(pasteSliceAction.stickElement(target))
    }

    const cut = () => {
        dispatch(pasteSliceAction.stickElement(target))
        target?.remove()
    }

    const paste = () => {
        const pasteElement = element?.cloneNode()
        target?.append(pasteElement as Node)
        update()
        // const curVnode = {
        //     id: current.id,
        //     vNode: useCompile(root, device.width, false, vprops)
        // }
        // const curWnode = {
        //     id: current.id,
        //     vNode: useCompile(root, device.width, true, vprops)
        // }
        // dispatch(routesSliceAction.updateVnode({
        //     curVnode, curWnode,
        //     user_id: '',
        //     program_id: '',
        //     ws: ''
        // }))
        
    }

    return [copy, cut, paste]
}
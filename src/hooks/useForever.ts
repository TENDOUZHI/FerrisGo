import { VNode } from "@/store/ast"
import { blockSliceAction } from "@/store/block.slice"
import { messageSliceAction } from "@/store/message.slice"
import { selectVapp } from "@/store/vapp.slice"
import { invoke } from "@tauri-apps/api"
import { useDispatch, useSelector } from "react-redux"
import { useBetterDiff } from "./useBetterDiff"

export const useForever = (): (() => void)[] => {
    const dispatch = useDispatch()
    const vapp = useSelector(selectVapp)
    const diff = useBetterDiff()
    const saveFileData = async () => {
        dispatch(messageSliceAction.setCorrect('保存成功'))
        // dispatch(blockSliceAction.setBlock())
        // const data = JSON.stringify(vapp)
        // await invoke('save_file_data', { data: data }).then(res => {
        //     dispatch(blockSliceAction.stopBlock())
        //     dispatch(messageSliceAction.setCorrect('保存成功'))
        // }, () => {
        //     dispatch(messageSliceAction.setError('保存失败'))
        //     dispatch(blockSliceAction.stopBlock())
        // })
    }
    const undoFn = () => {
        invoke('undo_operate').then((res) => {
            diff(res as VNode, vapp.routes[0].vnode)
        }, () => {
            dispatch(messageSliceAction.setWarn('无可撤回操作执行'))
        })
    }
    return [saveFileData, undoFn]
}
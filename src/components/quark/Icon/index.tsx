import { sourceSliceAction } from "@/store/source.slice"
import { useDispatch } from "react-redux"
import { DragEvent } from 'react'
import component from '@/assets/component.png'

export const Icon = () => {
    const dispatch = useDispatch()
    const drag = (e: DragEvent) => {
        e.preventDefault()
        dispatch(sourceSliceAction.captureSource(e.target))
    }
    return(
        <div id='icon'  className='components' draggable onDragCapture={drag}>
            <img src={component} alt="" />
            <span>icon</span>
        </div>
    )
}
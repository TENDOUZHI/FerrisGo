import {  sourceSliceAction } from '@/store/source.slice'
import { useDispatch, useSelector } from 'react-redux'
import { DragEvent, useRef } from 'react'
import component from '@/assets/component.png'
export const View = () => {
    const dispatch = useDispatch()
    const drag = (e: DragEvent) => {
        e.preventDefault()
        dispatch(sourceSliceAction.captureSource(e.target))
    }
    return (
        <div id="view" className='components' draggable={true} onDragCapture={drag}>
            <img src={component} alt="" />
            <span>view</span>
        </div>
    )
}
import { selectSource, sourceSliceAction } from '@/store/source.slice'
import { useDispatch, useSelector } from 'react-redux'
import { DragEvent, useRef } from 'react'
import { useDrag } from 'react-dnd'
import './index.scss'
export const View = () => {
    const dispatch = useDispatch()
    const drag = (e: DragEvent) => {
        e.preventDefault()
        dispatch(sourceSliceAction.captureSource(e.target))
    }
    return (
        <div id="view"  draggable={true} onDragCapture={drag}></div>
    )
}
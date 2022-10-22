import { selectSource, sourceSliceAction } from '@/store/source.slice'
import { useDispatch, useSelector } from 'react-redux'
import { DragEvent } from 'react'
import './index.scss'
export const View = () => {
    const dispatch = useDispatch()

    const drag = (e: DragEvent) => {
        e.preventDefault()
        dispatch(sourceSliceAction.captureSource(e.target))
    }
    return(
        <div id="view" draggable onDragCapture={drag}></div>
    )
}
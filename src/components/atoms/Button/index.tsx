import { selectSource, sourceSliceAction } from '@/store/source.slice'
import { useDispatch, useSelector } from 'react-redux'
import { DragEvent } from 'react'
import './index.scss'
export const Button = () => {
    const dispatch = useDispatch()
    const drag = (e: DragEvent) => {
        e.preventDefault()
        dispatch(sourceSliceAction.captureSource(e.target))
    }
    return(
        <button id='button' draggable onDragCapture={drag}></button>
    )
}
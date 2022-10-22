import { selectSource, sourceSliceAction } from '@/store/source.slice'
import { DragEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import './index.scss'
export const Text = () => {
    const dispatch = useDispatch()
    const source = useSelector(selectSource)

    const drag = (e: DragEvent) => {
        e.preventDefault()
        dispatch(sourceSliceAction.captureSource(e.target))
    }
    return (
        <div id="text" draggable onDragCapture={drag}></div>
    )
}
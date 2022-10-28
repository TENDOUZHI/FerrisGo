import { selectSource, sourceSliceAction } from '@/store/source.slice'
import { DragEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import component from '@/assets/component.png'
export const Text = () => {
    const dispatch = useDispatch()
    const source = useSelector(selectSource)

    const drag = (e: DragEvent) => {
        e.preventDefault()
        dispatch(sourceSliceAction.captureSource(e.target))
    }
    return (
        <div id="text" className='components' draggable onDragCapture={drag}>
            <img src={component} alt="" />
            <span>text</span>
        </div>
    )
}
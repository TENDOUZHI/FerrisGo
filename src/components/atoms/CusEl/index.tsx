import { sourceSliceAction } from '@/store/source.slice'
import './index.scss'
import { useDispatch } from 'react-redux'
import component from '@/assets/component.png'
import { DragEvent } from 'react'

interface CusEl {
    title: string
    id: number
}

export const CusEl = (props: CusEl) => {
    const dispatch = useDispatch()
    const drag = (e: DragEvent) => {
        e.preventDefault()
        dispatch(sourceSliceAction.captureSource(e.target))
    }
    return (
        <div id={props.title} className='components' data-type='custom' data-name={props.title} data-cusid={props.id} draggable onDragCapture={drag}>
            <img src={component} alt="" />
            <span>{props.title}</span>
        </div>
    )
}
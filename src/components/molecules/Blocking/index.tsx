import { selectBlock } from '@/store/block.slice'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import './index.scss'


export const Blocking = () => {
    const block = useSelector(selectBlock)
    const circle = useRef<any>()
    const blocking = useRef<any>()
    const [close, setClose] = useState<boolean>(false)

    useLayoutEffect(() => {
        if(block) blocking.current.style.display = 'flex'
        else blocking.current.style.display = 'none'
        const timer = setInterval(() => {
            if (close) {
                circle.current.style.strokeDasharray = '250, 300'
                setClose(() => false)
            } else {
                circle.current.style.strokeDasharray = '10, 70'
                setClose(() => true)
            }
        }, 1500)

        return () => {
            clearInterval(timer)
        };
    })
    return (
        <div className="blocking" ref={blocking}>
            <svg className='blocking_svg' height='10%' width='10%' >
                <circle className='blocking_svg_circle' ref={circle} cx='50%' cy='50%' r='40'></circle>
            </svg>
        </div>
    )
}
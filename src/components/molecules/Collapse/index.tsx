import './index.scss'
import arrow from '@/assets/arrow.png'
import { ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { usePurge } from '@/hooks/usePurge'
import { Dispatch } from '@reduxjs/toolkit'

interface Props {
    title: string,
    dispatch: Dispatch
    children: ReactNode
    num: number
}
export const Collapse = (props: Props) => {
    const arrowRef = useRef<any>()
    const container = useRef<any>()

    const [contai, setContai] = useState<any>()
    const [arr, setArr] = useState<any>()
    const { children } = props
    // @ts-ignore
    const purgeContainer = usePurge(contai, arr, Math.ceil(props.num / 2) * 67)

    useLayoutEffect(() => {
        setContai(container.current)
        setArr(arrowRef.current)
    })

    return (
        <div className="collapse">
            <div className="collapse_title" onClick={purgeContainer}>
                <span> {props.title}</span>
                <img src={arrow} alt="" ref={arrowRef} />
            </div>
            <div className="collapse_content" ref={container}>
                {children}
            </div>
        </div>
    )
}
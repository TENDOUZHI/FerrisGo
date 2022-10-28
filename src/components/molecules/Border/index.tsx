import { StyleInput } from "@/components/atoms/Effect/StyleInput"
import { useGetValue } from "@/hooks/useGetValue"
import { usePurge } from "@/hooks/usePurge"
import { Dispatch } from "@reduxjs/toolkit"
import { useRef, useState } from "react"
import './index.scss'
import arrow from '@/assets/arrow.png'

interface Props {
    target: HTMLElement,
    dispatch: Dispatch
}
export const Border = (props: Props) => {
    const target = props.target
    const [borderWidth, setBorderWidth] = useGetValue('border-width', props.dispatch)
    const [borderColor, setBorderColor] = useGetValue('border-color', props.dispatch)
    const container = useRef<any>()
    const arrowRef = useRef<any>()
    const purgeContainer = usePurge(container.current, arrowRef.current, 38)
    return (
        <div className="attribute">
            <div className='attribute-title' onClick={purgeContainer}>
                <span>边框</span>
                <img src={arrow} ref={arrowRef} alt="" />
            </div>
            <div className="attribute-content" ref={container}>
                <StyleInput tip='边框宽度' title="BW" value={borderWidth} changeValue={setBorderWidth} />
                <StyleInput tip='边框颜色' title="BC" value={borderColor} changeValue={setBorderColor} />
            </div>
        </div>
    )
}
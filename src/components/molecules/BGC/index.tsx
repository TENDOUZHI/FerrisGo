import { StyleInput } from "@/components/atoms/Effect/StyleInput"
import { useGetValue } from "@/hooks/useGetValue"
import { Dispatch } from "@reduxjs/toolkit"
import { useRef, useState } from "react"
import arrow from '@/assets/arrow.png'
import { usePurge } from "@/hooks/usePurge"

interface Props {
    target: HTMLElement,
    dispatch: Dispatch
}
export const Bgc = (props: Props) => {
    const target = props.target
    const [bgc, setBgc] = useGetValue('background-color', props.dispatch)
    const [opacity, setOpacity] = useGetValue('opacity', props.dispatch)
    const container = useRef<any>()
    const arrowRef = useRef<any>()
    const purgeContainer = usePurge(container.current, arrowRef.current, 38)
    return (
        <div className="attribute">
            <div className='attribute-title' onClick={purgeContainer}>
                <span>填充</span>
                <img src={arrow} ref={arrowRef} alt="" />
            </div>
            <div className="attribute-content" ref={container}>
                <StyleInput type="color" tip='背景颜色' title="Bgc" value={bgc} changeValue={setBgc} />
                <StyleInput tip='透明度' title="op" value={opacity} changeValue={setOpacity} />
            </div>
        </div>
    )
}
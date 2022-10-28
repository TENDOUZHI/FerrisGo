import { StyleInput } from '@/components/atoms/Effect/StyleInput'
import { useGetValue } from '@/hooks/useGetValue'
import { usePurge } from '@/hooks/usePurge'
import { Dispatch } from '@reduxjs/toolkit'
import { useRef } from 'react'
import arrow from '@/assets/arrow.png'
import './index.scss'
interface Props {
    target: HTMLElement,
    dispatch: Dispatch
}
export const Padding = (props: Props) => {
    // align row column center
    const target = props.target
    const [paddingTop, setpaddingTop] = useGetValue('padding-top', props.dispatch)
    const [paddingBottom, setpaddingBottom] = useGetValue('padding-bottom', props.dispatch)
    const [paddingLeft, setpaddingLeft] = useGetValue('padding-left', props.dispatch)
    const [paddingRight, setpaddingRight] = useGetValue('padding-right', props.dispatch)
    const container = useRef<any>()
    const arrowRef = useRef<any>()
    const purgeContainer = usePurge(container.current, arrowRef.current, 76)
    return (
        <div className="attribute">
            <div className='attribute-title' onClick={purgeContainer}>
                <span>内边距</span>
                <img src={arrow} ref={arrowRef} alt="" />
            </div>
            <div className="attribute-content" ref={container}>
                <StyleInput tip='上内距' title='PT' value={paddingTop} changeValue={setpaddingTop} />
                <StyleInput tip='下内距' title='PB' value={paddingBottom} changeValue={setpaddingBottom} />
                <StyleInput tip='左内距' title='PL' value={paddingLeft} changeValue={setpaddingLeft} />
                <StyleInput tip='右内距' title='PR' value={paddingRight} changeValue={setpaddingRight} />
            </div>

        </div>
    )
}
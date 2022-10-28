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
export const Margin = (props: Props) => {
    // align row column center
    const target = props.target
    const [marginTop, setMarginTop] = useGetValue('margin-top', props.dispatch)
    const [marginBottom, setMarginBottom] = useGetValue('margin-bottom', props.dispatch)
    const [marginLeft, setMarginLeft] = useGetValue('margin-left', props.dispatch)
    const [marginRight, setMarginRight] = useGetValue('margin-right', props.dispatch)
    const container = useRef<any>()
    const arrowRef = useRef<any>()
    const purgeContainer = usePurge(container.current, arrowRef.current, 76)
    return (
        <div className="attribute">
            <div className='attribute-title' onClick={purgeContainer}>
                <span>外边距</span>
                <img src={arrow} ref={arrowRef} alt="" />
            </div>
            <div className="attribute-content" ref={container}>
                <StyleInput tip='上边距' title='MT' value={marginTop} changeValue={setMarginTop} />
                <StyleInput tip='下边距' title='MB' value={marginBottom} changeValue={setMarginBottom} />
                <StyleInput tip='左边距' title='ML' value={marginLeft} changeValue={setMarginLeft} />
                <StyleInput tip='右边距' title='MR' value={marginRight} changeValue={setMarginRight} />
            </div>

        </div>
    )
}
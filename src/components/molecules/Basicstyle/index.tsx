import { StyleInput } from '@/components/atoms/StyleInput'
import { useGetValue } from '@/hooks/useGetValue'
import { Dispatch } from '@reduxjs/toolkit'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './index.scss'
import arrow from '@/assets/arrow.png'
import { usePurge } from '@/hooks/usePurge'

interface Props {
    target: HTMLElement,
    dispatch: Dispatch
}
export const Basicstyle = (props: Props) => {
    // width height border-radious angel margin padding
    // const target = props.target.style.content
    const [width, setWidth] = useGetValue('width', props.dispatch)
    const [height, setHeight] = useGetValue('height', props.dispatch)
    const [borderRadius, setBorderRadius] = useGetValue('border-radius', props.dispatch)
    const [fontSize, setFontSize] = useGetValue('font-size', props.dispatch)
    const [color, setColor] = useGetValue('color', props.dispatch)
    const [content, setContent] = useGetValue('content', props.dispatch)
    const [targetId, setTargetId] = useState<string>('')
    const container = useRef<any>()
    const arrowRef = useRef<any>()
    const purgeContainer = usePurge(container.current, arrowRef.current, 114)
    useLayoutEffect(() => {
        if (props.target !== null) {
            setTargetId(props.target.id)
        }

    }, [props])
    return (
        <div className="attribute">
            <div className='attribute-title' onClick={purgeContainer}>
                <span>布局</span>
                <img src={arrow} ref={arrowRef} alt="" />
            </div>
            <div className="attribute-content" ref={container}>
                <StyleInput tip='宽度' title='W' value={width} changeValue={setWidth} />
                <StyleInput tip='高度' title='H' value={height} changeValue={setHeight} />
                <StyleInput tip='圆角' title='R' value={borderRadius} changeValue={setBorderRadius} />
                <StyleInput tip='字体' title='FZ' value={fontSize} changeValue={setFontSize} />
                <StyleInput tip='颜色' title='FC' type='color' value={color} changeValue={setColor} />
                {targetId === 'text' && <StyleInput tip='内容' title='C' value={content} changeValue={setContent} />}
            </div>

        </div>
    )
}
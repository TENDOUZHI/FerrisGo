import { StyleInput } from '@/components/atoms/Effect/StyleInput'
import { useGetValue } from '@/hooks/useGetValue'
import { usePurge } from '@/hooks/usePurge'
import { Dispatch } from '@reduxjs/toolkit'
import { useEffect, useRef, useState } from 'react'
import arrow from '@/assets/arrow.png'
import './index.scss'

interface Props {
    target: HTMLElement,
    dispatch: Dispatch
}
export const Display = (props: Props) => {
    const target = props.target
    const [status, setStatus] = useState<string>('')
    const [display, setDisplay] = useGetValue('display', props.dispatch)
    const [flexDirection, setFlexDirection] = useGetValue('flex-direction', props.dispatch)
    const [justifyContent, setJustiContent] = useGetValue('justify-content', props.dispatch)
    const [justifyItems, setJustifyItems] = useGetValue('justify-items', props.dispatch)
    const [alignItems, setAlignItems] = useGetValue('align-items', props.dispatch)
    const [alignContent, setAlignContent] = useGetValue('align-content', props.dispatch)
    const updateDis = (value: string) => {
        console.log(display);
        setStatus(value)
    }
    useEffect(() => {
        if (target !== null) {
            setStatus(getComputedStyle(target).getPropertyValue('display'))
        }
    })
    const container = useRef<any>()
    const arrowRef = useRef<any>()
    const purgeContainer = usePurge(container.current, arrowRef.current, 114)

    return (
        <div className="attribute">
            <div className='attribute-title' onClick={purgeContainer}>
                <span>放置</span>
                <img src={arrow} ref={arrowRef} alt="" />
            </div>
            <div className="attribute-content" ref={container}>
                <StyleInput tip='display' title='Ds' value={display} changeValue={setDisplay} ifValue={updateDis} />
                {
                    status === 'flex' &&
                    <>
                        <StyleInput tip='弹性方向' title='JC' value={flexDirection} changeValue={setFlexDirection} />
                        <StyleInput tip='横向内容' title='JC' value={justifyContent} changeValue={setJustiContent} />
                        <StyleInput tip='横向单位' title='JI' value={justifyItems} changeValue={setJustifyItems} />
                        <StyleInput tip='纵向单位' title='AI' value={alignItems} changeValue={setAlignItems} />
                        <StyleInput tip='纵向内容' title='AC' value={alignContent} changeValue={setAlignContent} />
                    </>
                }
            </div>
        </div>
    )
}
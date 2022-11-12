import { usePurge } from "@/hooks/usePurge"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import arrow from '@/assets/arrow.png'
import { Dispatch } from "@reduxjs/toolkit"
import { StyleInput } from "@/components/atoms/Effect/StyleInput"
import { useGetValue } from "@/hooks/effective/useGetValue"
import { ListMenu } from "@/components/atoms/Effect/ListMenu"
import { useVprops } from "@/hooks/useVprops"
interface Props {
    target: HTMLElement,
    dispatch: Dispatch
}
export const IconSet = (props: Props) => {
    const vprops = useVprops()
    const container = useRef<any>()
    const arrowRef = useRef<any>()
    const whole = useRef<any>()
    const purgeContainer = usePurge(container.current, arrowRef.current, 42)
    const [title, setTitle] = useState<string>(vprops.icon.content.get('default')?.icon_type as string)
    const [size, setSize] = useGetValue('icon', props.dispatch, 'size')
    const types = ['success', 'tip', 'warn',]
    useLayoutEffect(() => {
        whole.current.style.display = 'none'
        if (props.target !== null) {
            if (props.target.id === 'icon') {
                whole.current.style.display = 'flex'
            }
        }
    }, [props])
    useLayoutEffect(() => {
        if (props.target !== null) {
            setTitle(vprops.icon.content.get(props.target.classList[0])?.icon_type as string)
        }
    }, [vprops])
    return (
        <div className="attribute" ref={whole}>
            <div className='attribute-title' onClick={purgeContainer}>
                <span>icon设置</span>
                <img src={arrow} ref={arrowRef} alt="" />
            </div>
            <div className="attribute-content" ref={container}>
                <StyleInput title="SZ" tip="size" hoc={true} value={size} changeValue={setSize} />
                <ListMenu value={types} currentPath={title} type='icon' left='' top="105px" bottom="" right="50px" />
            </div>
        </div>
    )
}
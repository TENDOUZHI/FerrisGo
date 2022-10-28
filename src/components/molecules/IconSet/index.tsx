import { usePurge } from "@/hooks/usePurge"
import { useLayoutEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import arrow from '@/assets/arrow.png'
import { Dispatch } from "@reduxjs/toolkit"
import { SwiperItem } from "@/components/atoms/SwiperItem"
import { useSelector } from "react-redux"
import { selectImage } from "@/store/image.slice"
import { FileInput } from "@/components/atoms/Effect/FileInput"
import { useVprops } from "@/hooks/useVprops"
import { StyleInput } from "@/components/atoms/Effect/StyleInput"
import { useGetValue } from "@/hooks/effective/useGetValue"
interface Props {
    target: HTMLElement,
    dispatch: Dispatch
}
export const IconSet = (props: Props) => {
    const container = useRef<any>()
    const arrowRef = useRef<any>()
    const whole = useRef<any>()
    const vprops = useVprops()
    const purgeContainer = usePurge(container.current, arrowRef.current, 40)
    const [classList, setClassList] = useState<string>('default')
    const [size, setSize] = useGetValue('icon', props.dispatch,'size',classList)
    useLayoutEffect(() => {
        whole.current.style.display = 'none'
        if (props.target !== null) {
            setClassList(props.target.classList[0])
            if (props.target.id === 'icon') {
                whole.current.style.display = 'flex'
            }
        }
    }, [props])
    return (
        <div className="attribute" ref={whole}>
            <div className='attribute-title' onClick={purgeContainer}>
                <span>icon设置</span>
                <img src={arrow} ref={arrowRef} alt="" />
            </div>
            <div className="attribute-content" ref={container}>
                <StyleInput title="SZ" tip="size" hoc={true} value={size} changeValue={setSize} />
            </div>
        </div>
    )
}
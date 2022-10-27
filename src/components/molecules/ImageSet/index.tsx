import { usePurge } from "@/hooks/usePurge"
import { useLayoutEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import arrow from '@/assets/arrow.png'
import { Dispatch } from "@reduxjs/toolkit"
import { SwiperItem } from "@/components/atoms/SwiperItem"
import { useSelector } from "react-redux"
import { selectImage } from "@/store/image.slice"
import { FileInput } from "@/components/atoms/Effect/FileInput"
interface Props {
    target: HTMLElement,
    dispatch: Dispatch
}
export const ImageSet = (props: Props) => {
    const dispatch = useDispatch()
    const container = useRef<any>()
    const arrowRef = useRef<any>()
    const whole = useRef<any>()
    const image = useSelector(selectImage)
    const purgeContainer = usePurge(container.current, arrowRef.current, 100)
    useLayoutEffect(() => {
        whole.current.style.display = 'none'
        if (props.target !== null) {
            if (props.target.id === 'image') {
                whole.current.style.display = 'flex'
            }
        }
    }, [props])
    return (
        <div className="attribute" ref={whole}>
            <div className='attribute-title' onClick={purgeContainer}>
                <span>图片设置</span>
                <img src={arrow} ref={arrowRef} alt="" />
            </div>
            <div className="attribute-content" ref={container}>
                <FileInput src={image.src} />
            </div>
        </div>
    )
}
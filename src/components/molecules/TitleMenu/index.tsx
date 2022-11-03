import { useLayoutEffect, useRef } from 'react'
import './index.scss'

interface Props {
    show: boolean
    secShow: boolean
    width?: string
    left?: string
    right?: string
    top?: string
    bottom?: string
}

export const TitleMenu = (props: Props) => {
    // @ts-ignore
    const children = props.children
    const menu = useRef<any>()
    useLayoutEffect(() => {
        if (props.show && props.secShow) {
            menu.current.style.display = 'flex'
        } else {
            menu.current.style.display = 'none'
        }
    }, [props])
    return (
        <ul className="titlemenu" style={{ width: props.width, left: props.left, top: props.top, bottom: props.bottom, right: props.right }} ref={menu}>
            {children}
        </ul>
    )
}
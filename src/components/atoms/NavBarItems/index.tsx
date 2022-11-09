import './index.scss'

import avatar from '@/assets/avatar.png'
import { useEffect, useRef } from 'react'

interface Props {
    color: string
    selectedColor: string
    text: string
}

export const NavBarItems = (props: Props) => {
    const nav = useRef<any>()
    useEffect(() => {
        nav.current.style.color = props.color
    }, [props])

    return (
        <div className="navbaritems" ref={nav}>
            <div className="navbaritems_icon">
                <img src={avatar} alt="icon" />
            </div>
            <div className="navbaritems_text">{props.text}</div>
        </div>
    )
}
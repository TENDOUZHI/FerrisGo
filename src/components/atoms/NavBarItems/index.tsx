import './index.scss'

import avatar from '@/assets/avatar.png'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { navigatorSliceAction, selectNav } from '@/store/navigator.slice'
import { useSelector } from 'react-redux'
import { useChangeRoute } from '@/hooks/useChangeRoute'

interface Props {
    id: number
    color: string
    selectedStatus: boolean
    selectedColor: string
    text: string
    icon: string | null
    selectedIcon: string | null
    connectId: number
    path: string
}

export const NavBarItems = (props: Props) => {
    const dispatch = useDispatch()
    const changeRoute = useChangeRoute()
    const nav = useRef<any>()
    const text = useRef<any>()
    const [icon, setIcon] = useState<string>(avatar)
    useEffect(() => {
        if (!props.selectedStatus) {
            text.current.style.color = props.color
            if (props.icon !== null) setIcon(props.icon)
        } else {
            text.current.style.color = props.selectedColor
            if (props.selectedIcon !== null) setIcon(props.selectedIcon)
        }
    }, [props])

    const select = () => {
        text.current.style.color = props.selectedColor
        if (props.selectedIcon !== null) setIcon(props.selectedIcon)
        dispatch(navigatorSliceAction.updateSelectedStatue(props.id))
        changeRoute(props.connectId, props.path)
    }

    return (
        <div className="navbaritems" ref={nav} onClick={select}>
            <div className="navbaritems_icon">
                <img src={icon} alt="icon" />
            </div>
            <div className="navbaritems_text" ref={text}>{props.text}</div>
        </div>
    )
}
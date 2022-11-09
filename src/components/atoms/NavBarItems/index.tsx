import './index.scss'

import avatar from '@/assets/avatar.png'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { navigatorSliceAction, selectNav } from '@/store/navigator.slice'
import { useSelector } from 'react-redux'

interface Props {
    id: number
    color: string
    selectedStatus: boolean
    selectedColor: string
    text: string
}

export const NavBarItems = (props: Props) => {
    const dispatch = useDispatch()
    // const navigator = useSelector(selectNav)
    const nav = useRef<any>()
    const text = useRef<any>()
    useEffect(() => {
        console.log(props.selectedStatus);
        
        if (!props.selectedStatus) {
            text.current.style.color = props.color
        } else {
            text.current.style.color = props.selectedColor
        }
    }, [props])

    const select = () => {
        text.current.style.color = props.selectedColor
        dispatch(navigatorSliceAction.updateSelectedStatue(props.id))
    }

    return (
        <div className="navbaritems" ref={nav} onClick={select}>
            <div className="navbaritems_icon">
                <img src={avatar} alt="icon" />
            </div>
            <div className="navbaritems_text" ref={text}>{props.text}</div>
        </div>
    )
}
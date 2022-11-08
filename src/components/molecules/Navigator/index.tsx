import { selectTabBar } from '@/store/source.slice'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import './index.scss'

interface Props {
    // show: boolean,
    // setShow: ((value: boolean) => void)
}

export const Navigator = (props: Props) => {
    const tabBar = useSelector(selectTabBar)
    const navigator = useRef<any>()
    const [tabBarText, setTabBarText] = useState<string>('启用')
    const [show, setShow] = useState<boolean>(false)
    const switchTabBar = () => {
        if (show) {
            setTabBarText('启用')
            setShow(false)
            tabBar!.style.display = 'none'
        } else {
            setTabBarText('禁用')
            setShow(true)
            tabBar!.style.display = 'block'
        }
    }
    return (
        <div className="navigator_switch">
            <span className="navigator_switch_title">启用导航栏:</span>
            <span className="navigator_switch_btn navigator_start" onClick={switchTabBar}>{tabBarText}</span>
        </div>
    )
}
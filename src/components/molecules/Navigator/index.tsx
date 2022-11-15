import { StyleInput } from '@/components/atoms/Effect/StyleInput'
import { useNavigator } from '@/hooks/effective/useNavigator'
import { navigatorSliceAction, selectNav, selectTabBar } from '@/store/navigator.slice'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import './index.scss'
import { NavItems } from '@/components/atoms/NavItems'
import { useDispatch } from 'react-redux'
import { messageSliceAction } from '@/store/message.slice'
import { routesSliceAction, selectVapp } from '@/store/vapp.slice'
import { jumplayerSliceAction } from '@/store/jumplayer.slice'

interface Props {
    // show: boolean,
    // setShow: ((value: boolean) => void)
}

export const Navigator = (props: Props) => {
    const dispatch = useDispatch()
    const vapp = useSelector(selectVapp)
    const tabBar = useSelector(selectTabBar)
    const navigator = useSelector(selectNav)
    const switchBtn = useRef<any>()
    const setting = useRef<any>()
    const [tabBarText, setTabBarText] = useState<string>('启用')
    const [show, setShow] = useState<boolean>(navigator.tab_bar_status)
    const [color, setColor] = useNavigator('color')
    const [selectColor, setSelectColor] = useNavigator('selectedColor')
    const [borderColor, setBorderColor] = useNavigator('borderColor')
    const [paths, setPaths] = useState<Array<string>>([])
    const [pathId, setPathId] = useState<Array<number>>([])
    useEffect(() => {
        paths.length = 0
        pathId.length = 0
        vapp.routes.forEach((route) => {
            if (route.state === 0) {
                pathId.push(route.id)
                paths.push(route.name)
                setPaths([...paths])
                setPathId([...pathId])
            }
        })
    }, [vapp])
    useEffect(() => {
        if (navigator.tab_bar_status) {
            setTabBarText('禁用')
            setting.current.style.maxHeight = '500px'
            switchBtn.current.classList.add('navigator_abuse')
            switchBtn.current.classList.remove('navigator_start')
        } else {
            setTabBarText('启用')
            setting.current.style.maxHeight = 0
            switchBtn.current.classList.add('navigator_start')
            switchBtn.current.classList.remove('navigator_abuse')
        }
        dispatch(jumplayerSliceAction.capCertainFn(certainFn))
    }, [navigator])
    const switchTabBar = () => {
        if (show) {
            stop()
        } else {
            start()
        }
    }

    const stop = () => {
        setTabBarText('启用')
        setShow(false)
        setting.current.style.maxHeight = 0
        switchBtn.current.classList.add('navigator_start')
        switchBtn.current.classList.remove('navigator_abuse')
        dispatch(navigatorSliceAction.updateTabBarStatus(false))
    }
    const start = () => {
        setTabBarText('禁用')
        setShow(true)
        setting.current.style.maxHeight = '500px'
        switchBtn.current.classList.add('navigator_abuse')
        switchBtn.current.classList.remove('navigator_start')
        dispatch(navigatorSliceAction.updateTabBarStatus(true))
    }

    const newItem = () => {
        if (navigator.items.length < 5) dispatch(navigatorSliceAction.newItem())
        else dispatch(messageSliceAction.setWarn('导航栏最多设置五个选项'))
    }
    const certainFn = () => {
        dispatch(routesSliceAction.updateNavigator(navigator))
    }

    return (
        <>
            <div className="navigator_switch">
                <span className="navigator_switch_title">启用导航栏:</span>
                <span className="navigator_switch_btn navigator_start" ref={switchBtn} onClick={switchTabBar}>{tabBarText}</span>
            </div>
            <div className="navigator_setting" ref={setting}>
                <div className="navigator_setting_title">属性设置</div>
                <div className="navigator_setting_attr">
                    <StyleInput tip='字体颜色' title='FC' type='color' value={color} changeValue={setColor} />
                    <StyleInput tip='选中颜色' title='SC' type='color' value={selectColor} changeValue={setSelectColor} />
                    <StyleInput tip='边框颜色' title='BC' type='color' value={borderColor} changeValue={setBorderColor} />
                    <div style={{ width: '40%', height: '30px', marginLeft: '8px', marginTop: '8px' }}></div>
                </div>
                <div className="navigator_setting_items_title">
                    <div className="navigator_setting_items_title_span">
                        导航栏选项设置
                    </div>
                    <div className="navigator_setting_items_title_add" onClick={newItem}>
                        新增item
                    </div>
                </div>
                {
                    navigator.items.map(item => {
                        return <NavItems
                            key={item.id}
                            id={item.id}
                            paths={paths}
                            currentPath={item.path}
                            pathId={pathId}
                            text={item.text}
                            icon={item.icon as string}
                            selectedIcon = {item.selected_icon as string}
                        />
                    })
                }
            </div>

        </>

    )
}
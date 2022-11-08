import { StyleInput } from '@/components/atoms/Effect/StyleInput'
import { useNavigator } from '@/hooks/effective/useNavigator'
import { selectTabBar } from '@/store/source.slice'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import './index.scss'
import defaultImg from '@/assets/default.png'
import arrow from '@/assets/arrow.png'
import { ListMenu } from '@/components/atoms/Effect/ListMenu'
import { NavItems } from '@/components/atoms/NavItems'

interface Props {
    // show: boolean,
    // setShow: ((value: boolean) => void)
}

export const Navigator = (props: Props) => {
    const tabBar = useSelector(selectTabBar)
    const switchBtn = useRef<any>()
    const setting = useRef<any>()
    const [tabBarText, setTabBarText] = useState<string>('启用')
    const [show, setShow] = useState<boolean>(false)
    const [color, setColor] = useNavigator('color')
    const [selectColor, setSelectColor] = useState<string>('#fff')
    const [borderColor, setBorderColor] = useNavigator('border-color')
    const switchTabBar = () => {
        if (show) {
            setTabBarText('启用')
            setShow(false)
            tabBar!.style.display = 'none'
            setting.current.style.maxHeight = 0
            switchBtn.current.classList.add('navigator_start')
            switchBtn.current.classList.remove('navigator_abuse')
        } else {
            setTabBarText('禁用')
            setShow(true)
            tabBar!.style.display = 'block'
            setting.current.style.maxHeight = '500px'
            switchBtn.current.classList.add('navigator_abuse')
            switchBtn.current.classList.remove('navigator_start')
        }
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
                <NavItems />
            </div>

        </>

    )
}
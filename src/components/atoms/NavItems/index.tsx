import './index.scss'
import defaultImg from '@/assets/default.png'
import { ListMenu } from '../Effect/ListMenu'
import { FileInput } from '../Effect/FileInput'
import { useSelector } from 'react-redux'
import { selectTabBar } from '@/store/navigator.slice'
import { useState } from 'react'
import { NavIcon } from '../Effect/NavIcon'

export const NavItems = () => {
    const tabBar = useSelector(selectTabBar)
    const [value, setValue] = useState<string>('')

    const onChange = (e: { target: { value: string } }) => {
        setValue(e.target.value)

    }

    return (
        <div className="navitems_setting_items">

            <div className="navitems_setting_items_attr">
                <div className="navitems_setting_items_attr_text">
                    <span>文本内容:</span>
                    <input type="text" value={value} onChange={onChange} />
                </div>
                <div className="navitems_setting_items_attr_path">
                    <span>页面路径:</span>
                    <ListMenu value={['wwwww', 'sssss', 'aaaaa', 'dddd']} type='path' left='95px' right='0px' top='45px' bottom='0' />
                </div>
            </div>
            <div className="navitems_setting_items_attr">
                <div className="navitems_setting_items_attr_icon">
                    <span>icon图片:</span>
                    {/* <img src={defaultImg} alt="" /> */}
                    <div className="navitems_setting_items_attr_icon_input">
                        <NavIcon />
                    </div>

                </div>
                <div className="navitems_setting_items_attr_icon">
                    <span>选中icon图片:</span>
                    {/* <img src={defaultImg} alt="" /> */}
                    <div className="navitems_setting_items_attr_icon_input">
                    <NavIcon />
                    </div>
                </div>
            </div>

        </div>
    )
}
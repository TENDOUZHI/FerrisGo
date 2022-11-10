import './index.scss'
import defaultImg from '@/assets/default.png'
import { ListMenu } from '../Effect/ListMenu'
import { FileInput } from '../Effect/FileInput'
import { useSelector } from 'react-redux'
import { navigatorSliceAction, selectNav, selectTabBar } from '@/store/navigator.slice'
import { useEffect, useLayoutEffect, useState } from 'react'
import { NavIcon } from '../Effect/NavIcon'
import { selectVapp } from '@/store/vapp.slice'
import { useDispatch } from 'react-redux'

interface Props {
    id: number
    paths: Array<string>
    text: string
}

export const NavItems = (props: Props) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState<string>(props.text)

    const onChange = (e: { target: { value: string } }) => {
        setValue(e.target.value)
    }
    const blurInput = () => {
        dispatch(navigatorSliceAction.onChangeText({ id: props.id, text: value }))
    }

    return (
        <div className="navitems_setting_items">

            <div className="navitems_setting_items_attr">
                <div className="navitems_setting_items_attr_text">
                    <span>文本内容:</span>
                    <input type="text" value={value} onChange={onChange} onBlur={blurInput} />
                </div>
                <div className="navitems_setting_items_attr_path">
                    <span>页面路径:</span>
                    <ListMenu value={props.paths} type='path' left='95px' right='0px' top='45px' bottom='0' navId={props.id} />
                </div>
            </div>
            <div className="navitems_setting_items_attr">
                <div className="navitems_setting_items_attr_icon">
                    <span>默认图标:</span>
                    <div className="navitems_setting_items_attr_icon_input">
                        <NavIcon id={props.id} type='defaultIcon' />
                    </div>

                </div>
                <div className="navitems_setting_items_attr_icon">
                    <span>选中图标:</span>
                    <div className="navitems_setting_items_attr_icon_input">
                        <NavIcon id={props.id} type='selectedIcon' />
                    </div>
                </div>
            </div>

        </div>
    )
}
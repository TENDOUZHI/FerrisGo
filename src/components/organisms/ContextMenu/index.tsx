import { useDeleteEl } from '@/hooks/useDeleteEl'
import { useForever } from '@/hooks/useForever'
import { usePaste } from '@/hooks/usePaste'
import { useEffect, useRef } from 'react'
import './index.scss'

export const ContextMenu = () => {
    const menu = useRef<any>()
    const [saveFileData, undoFn] = useForever()
    const deleteEl = useDeleteEl()
    const [copy, cut, paste] = usePaste()
    useEffect(() => {

    }, [])
    window.oncontextmenu = (e: MouseEvent) => {
        e.preventDefault()
        const scWidth = window.screen.width
        const scHeight = window.screen.height
        const width = getComputedStyle(menu.current).width
        const height = getComputedStyle(menu.current).minHeight
        const numWidth = parseInt(width.substring(0, width.length - 2))
        const numHeight = parseInt(height.substring(0, height.length - 2))
        const xAxis = e.clientX
        const yAxis = e.clientY
        if (numWidth < (scWidth - xAxis) && numHeight < (scHeight - yAxis)) menu.current.style.transform = 'translate(0%,0%)'
        if (numWidth >= (scWidth - xAxis) && numHeight < (scHeight - yAxis)) menu.current.style.transform = 'translate(-100%,0%)'
        if (numWidth < (scWidth - xAxis) && numHeight >= (scHeight - yAxis)) menu.current.style.transform = 'translate(0%,-100%)'
        if (numWidth >= (scWidth - xAxis) && numHeight >= (scHeight - yAxis)) menu.current.style.transform = 'translate(-100%,-100%)'
        menu.current.style.display = 'flex'
        setTimeout(() => {
            menu.current.style.top = yAxis + 'px'
            menu.current.style.left = xAxis + 'px'
            menu.current.style.opacity = '1'
            document.addEventListener('click', hide)
        }, 10)

    }
    const hide = (e: MouseEvent) => {
        menu.current.style.display = 'none'
        menu.current.style.opacity = 0
        document.removeEventListener('click', hide)
    }
    return (
        <div id="contextmenu" className="contextmenu" ref={menu}>
            <ul className="contextmenu_list">
                <li className="contextmenu_list_li" onClick={copy}>
                    <div className="contextmenu_list_li_envelop">
                        <span className="contextmenu_list_li_envelop_left">复制</span>
                        <span className="contextmenu_list_li_envelop_right">Ctrl+C</span>
                    </div>

                </li>
                <li className="contextmenu_list_li" onClick={cut}>
                    <div className="contextmenu_list_li_envelop">
                        <span className="contextmenu_list_li_envelop_left">剪切</span>
                        <span className="contextmenu_list_li_envelop_right">Ctrl+X</span>
                    </div>

                </li>
                <li className="contextmenu_list_li" onClick={paste}>
                    <div className="contextmenu_list_li_envelop">
                        <span className="contextmenu_list_li_envelop_left">粘贴</span>
                        <span className="contextmenu_list_li_envelop_right">Ctrl+V</span>
                    </div>

                </li>
                <li className="contextmenu_list_li" onClick={deleteEl}>
                    <div className="contextmenu_list_li_envelop">
                        <span className="contextmenu_list_li_envelop_left">删除元素</span>
                        <span className="contextmenu_list_li_envelop_right">BackSpace</span>
                    </div>

                </li>
                <li className="contextmenu_list_li" onClick={saveFileData}>
                    <div className="contextmenu_list_li_envelop">
                        <span className="contextmenu_list_li_envelop_left">保存</span>
                        <span className="contextmenu_list_li_envelop_right">Ctrl+S</span>
                    </div>

                </li>
                <li className="contextmenu_list_li" onClick={undoFn}>
                    <div className="contextmenu_list_li_envelop">
                        <span className="contextmenu_list_li_envelop_left">撤回</span>
                        <span className="contextmenu_list_li_envelop_right">Ctrl+Z</span>
                    </div>

                </li>
            </ul>
        </div>
    )
}
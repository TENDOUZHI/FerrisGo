import './index.scss'
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useRef } from 'react';
import Ferris from '@/assets/Ferris.png'
export const TitleBar = () => {
    const minimize = useRef<any>()
    const maxmize = useRef<any>()
    const closewindow = useRef<any>()
    useEffect(() => {
        minimize.current
            .addEventListener("click", () => appWindow.minimize());
        maxmize.current
            .addEventListener("click", () => appWindow.toggleMaximize());
        closewindow.current
            .addEventListener("click", () => appWindow.close());
    },[])


    return (
        <div data-tauri-drag-region className="titlebar">
            <div className="titlebar_settings">
                <div className="titlebar_settings_logo">
                    <img src={Ferris} alt="" />
                </div>
                <div className="titlebar_settings_set">文件</div>
                <div className="titlebar_settings_set">编辑</div>
                <div className="titlebar_settings_set">选择</div>
                <div className="titlebar_settings_set">查看</div>
                <div className="titlebar_settings_set">帮助</div>
            </div>
            <div className="titlebar-buttons">
                <div className="titlebar-button" ref={minimize}>
                    <img
                        src="https://api.iconify.design/mdi:window-minimize.svg"
                        alt="minimize"
                    />
                </div>
                <div className="titlebar-button" ref={maxmize}>
                    <img
                        src="https://api.iconify.design/mdi:window-maximize.svg"
                        alt="maximize"
                    />
                </div>
                <div className="titlebar-button titlebar-close" ref={closewindow}>
                    <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
                </div>
            </div>

        </div>
    )
}
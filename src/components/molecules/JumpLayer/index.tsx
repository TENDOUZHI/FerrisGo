import { ReactNode, useEffect, useRef } from 'react'
import './index.scss'
interface Props {
    title: string
    show: boolean,
    setShow: ((value: boolean) => void)
    children: ReactNode
}

export const JumpLayer = (props: Props) => {
    // @ts-ignore
    const children = props.children
    const jumplayer = useRef<any>()
    useEffect(() => {
        if (props.show) jumplayer.current.style.display = 'flex'
        else jumplayer.current.style.display = 'none'
    }, [props])
    const close = () => {
        props.setShow(false)
    }
    return (
        <div className="jumplayer" ref={jumplayer}>
            <div className="jumplayer_setting">
                <header className="jumplayer_setting_head">
                    <div className="jumplayer_setting_head_title">{props.title}</div>
                    <div className="jumplayer_setting_head_close" onClick={close}>x</div>
                </header>
                <div className="jumplayer_setting_main">
                    {children}
                </div>
                <footer className="jumplayer_setting_foot">
                    <div className="jumplayer_setting_foot_cancel jumplayer_btn" onClick={close}>取消</div>
                    <div className="jumplayer_setting_foot_sure jumplayer_btn">确定</div>
                </footer>
            </div>
        </div>
    )
}
import { useEffect, useRef } from 'react'
import './index.scss'

interface Props {
    show: boolean,
    setShow: ((value: boolean) => void)
}

export const Navigator = (props: Props) => {
    const navigator = useRef<any>()
    useEffect(() => {
        if(props.show) navigator.current.style.display = 'flex'
        else navigator.current.style.display = 'none'
    },[props])
    const close = () => {
        props.setShow(false)
    }
    return (
        <div className="navigator" ref={navigator}>
            <div className="navigator_setting">
                <div className="navigator_setting_head">
                    <div className="navigator_setting_head_title">设置导航栏</div>
                    <div className="navigator_setting_head_close" onClick={close}>x</div>
                </div>
            </div>
        </div>
    )
}
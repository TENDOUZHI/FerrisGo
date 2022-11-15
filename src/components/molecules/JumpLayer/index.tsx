import { jumplayerSliceAction, selectJumpLayer } from '@/store/jumplayer.slice'
import { ReactNode, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import './index.scss'
interface Props {
    title: string
    show: boolean,
    setShow: ((value: boolean) => void)
    children: ReactNode
    certionFn: (() => void)
}

export const JumpLayer = () => {
    const dispatch = useDispatch()
    const jump = useSelector(selectJumpLayer)
    const certainFn = jump.certainFn as (() => void)
    const children = jump.children
    const jumplayer = useRef<any>()
    useEffect(() => {
        if (jump.show) jumplayer.current.style.display = 'flex'
        else jumplayer.current.style.display = 'none'
    }, [jump])
    const close = () => {
        dispatch(jumplayerSliceAction.setHide())
    }
    const certain = () => {
        certainFn()
        close()
    }
    return (
        <div className="jumplayer" ref={jumplayer}>
            <div className="jumplayer_setting">
                <header className="jumplayer_setting_head">
                    <div className="jumplayer_setting_head_title">{jump.title}</div>
                    <div className="jumplayer_setting_head_close" onClick={close}>x</div>
                </header>
                <div className="jumplayer_setting_main">
                    {children}
                </div>
                <footer className="jumplayer_setting_foot">
                    <div className="jumplayer_setting_foot_cancel jumplayer_btn" onClick={close}>取消</div>
                    <div className="jumplayer_setting_foot_sure jumplayer_btn" onClick={certain}>确定</div>
                </footer>
            </div>
        </div>
    )
}
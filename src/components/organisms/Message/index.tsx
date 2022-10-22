import ReactDOM, { createPortal } from 'react-dom'
import './index.scss'
import error from '@/assets/error.png'
import warn from '@/assets/warn.png'
import correct from '@/assets/correct.png'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { messageSliceAction, selectMessage } from '@/store/message.slice'
import { useDispatch } from 'react-redux'
export const Message = () => {
    const dispatch = useDispatch()
    const state = useSelector(selectMessage)
    const message = useRef<any>()
    const show = () => {
        message.current.style.display = 'flex'
        setTimeout(() => {
            message.current.style.opacity = '1'
            message.current.style.top = '5%'
        },100)
    }
    const hide = () => {
        message.current.style.opacity = '0'
        message.current.style.top = '0%'
        setTimeout(() => {
            message.current.style.display = 'none'
        }, 300)
    }
    const autoHide = () => {
        setTimeout(() => {
            dispatch(messageSliceAction.setHide())
        }, 3000)
    }
    useEffect(() => {
        if (state.show) show()
        else hide()
        switch (state.type) {
            case 'error':
                message.current.setAttribute('class', 'message message_error')
                autoHide()
                break;
            case 'correct':
                message.current.setAttribute('class', 'message message_correct')
                autoHide()
                break;
            case 'warn':
                message.current.setAttribute('class', 'message message_warn')
                autoHide()
                break;
            default:
                break;
        }
    })

    return (
        createPortal(
            <div className='message message_correct' ref={message}>
                <div className="message_icon">
                    {state.type === 'error' && <img src={error} alt="" />}
                    {state.type === 'correct' && <img src={correct} alt="" />}
                    {state.type === 'warn' && <img src={warn} alt="" />}
                </div>
                <div className="message_text">{state.text}</div>
            </div>
            , document.getElementById('root') as Element
        )

    )
}


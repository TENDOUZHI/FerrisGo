import { targetSliceAction } from '@/store/target.slice'
import { routesSliceAction } from '@/store/vapp.slice'
import { useRef, useState } from 'react'
import './index.scss'
import arrow from '@/assets/arrow.png'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/user.slice'
import { selectWs } from '@/store/ws.slice'
interface Props {
    changeRoute: (name: string, id: number) => void
    value: string
    id: number,
    program_id: number
}
export const RoutePage = (props: Props) => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const ws = useSelector(selectWs)
    const option = useRef<any>()
    const input = useRef<any>()
    const bar = useRef<any>()
    const arrowRef = useRef<any>()
    const arrowWrap = useRef<any>()
    const [show, setShow] = useState<boolean>(false)
    const switchOption = () => {
        if (!show) {
            option.current.classList.remove('none')
            option.current.classList.add('block')
            arrowRef.current.classList.add('rotate')
            setTimeout(() => {
                option.current.classList.add('show-ul')
            })
            dispatch(targetSliceAction.stateLayer(!show))
            setShow(true)
            setTimeout(() => {
                document.addEventListener('click', autoHide)
            });
        }
    }
    const updateValue = (e: { target: { value: any } }) => {
        dispatch(routesSliceAction.updateRouteName({
            id: props.id,
            name: e.target.value,
            user_id: user.id,
            program_id: props.program_id,
            ws: ws
        }))
    }
    const inputChangeAble = () => {
        input.current.readOnly = false
        input.current.style.cursor = 'text'
        input.current.focus()
        bar.current.style.width = '100%'
    }
    const blurInput = () => {
        input.current.readOnly = true
        bar.current.style.width = '0%'
    }
    // delete pages
    const deletePage = () => {
        dispatch(routesSliceAction.deleteRoute({
            id:props.id,
            user_id: user.id,
            program_id: props.program_id,
            ws: ws
        }))
    }
    const autoHide = (e: MouseEvent) => {
        if ((
            e.target !== arrowWrap.current ||
            e.target !== arrowWrap.current.childNodes[0] ||
            e.target !== option.current.childNodes[0] ||
            e.target !== option.current.childNodes[1]
        )
        ) {
            try {
                option.current.classList.add('none')
                option.current.classList.remove('block')
                option.current.classList.remove('show-ul')
                arrowRef.current.classList.remove('rotate')
                dispatch(targetSliceAction.stateLayer(!show))
                setShow(false)
                document.removeEventListener('click', autoHide)
            } catch (error) {

            }

        }
    }
    return (
        <li className="page-item"
            onClick={() => props.changeRoute(props.value, props.id)}
        >
            <div className='page-input-wrapper'>
                <input
                    className='page-item-input'
                    type="text"
                    value={props.value}
                    readOnly
                    onChange={(e) => updateValue(e)}
                    onBlur={() => blurInput()}
                    ref={input}
                />
                <div className="page-input-bar" ref={bar}></div>
            </div>
            <div className='page-item-options' ref={arrowWrap} onClick={() => switchOption()}>
                <img className='page-item-options-img' ref={arrowRef}
                    src={arrow} alt="" />
            </div>
            <ul className='page-item-ul none' ref={option}>
                <li className='page-item-ul-li' onClick={() => { switchOption(), inputChangeAble() }}>rename</li>
                <li className='page-item-ul-li' onClick={() => { switchOption(), deletePage() }}>delete</li>
            </ul>
        </li>
    )
}

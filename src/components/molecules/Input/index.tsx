import { useEffect, useRef, useState } from 'react'
import './index.scss'
type Status = 'error' | 'normal' | 'correct'
interface Props {
    value: string,
    setValue: ((value: string) => void)
    validateFun: (() => void)
    passCodeFun?: ((passType: string, setPassType: (value: string) => void,passBtn:HTMLElement) => void)
    placeholder: string,
    input_type: string,
    show: boolean,
    passcode: boolean
    msg: string,
    status: Status
    head?: boolean
}
export const Input = (props: Props) => {
    const frame = useRef<any>()
    const input = useRef<any>()
    const root = useRef<any>()
    const error = useRef<any>()
    const passBtn = useRef<any>()
    const [passType, setPassType] = useState<string>('获取验证码')
    useEffect(() => {
        if (props.show) {
            root.current.classList.remove('hide')
            root.current.classList.add('forminput')
        } else {
            root.current.classList.add('hide')
            root.current.classList.remove('forminput')
        }
        if (props.status === 'normal') {
            normalStatus()
        }
    }, [props])
    useEffect(() => {
        // every time value change will bring it back to normal style
        frame.current.classList.remove('error_input')
        error.current.classList.remove('show-error')
    }, [props.value])

    const errorStatus = () => {
        frame.current.classList.add('error_input')
        error.current.classList.add('show-error')
    }
    const normalStatus = () => {
        frame.current.setAttribute('class', 'forminput-all hover')
        error.current.setAttribute('class', 'forminput-error-msg')
    }
    const correctStatus = () => {
        error.current.classList.remove('show-error')
        frame.current.classList.remove('error_input')
        frame.current.classList.add('normal_input')
    }

    const focusInput = () => {
        frame.current.classList.add('normal_input')
        frame.current.classList.add('focus')
        frame.current.classList.remove('hover')
    }
    const blurInput = (status: Status) => {
        if (status === 'error') {
            errorStatus()
        } else if (status === 'correct') {
            correctStatus()
        }
        if (props.value === '') {
            frame.current.classList.add('error_input')
            error.current.classList.add('show-error')
        }
    }
    const changeValue = (e: { target: { value: any } }) => {
        if (props.passcode) {
            if (e.target.value.length <= 6) {
                props.setValue(e.target.value)
            }
        } else {
            if (e.target.value.length <= 20) {
                props.setValue(e.target.value)
            }

        }

    }

    return (
        <div className="hide" ref={root}>
            <div className="forminput-all hover" ref={frame}>
                <div className="forminput-all-wrapper">
                    <input className="forminput-all-wrapper-input"
                        onChange={changeValue}
                        value={props.value}
                        onFocus={focusInput}
                        onBlur={() => { blurInput(props.status); props.validateFun() }}
                        ref={input}
                        placeholder={props.placeholder}
                        type={props.input_type} />
                    {props.passcode && props.show &&
                        // @ts-ignore
                        <div className="forminput-all-wrapper-passcode" ref={passBtn} onClick={() => props.passCodeFun(passType, setPassType,passBtn.current)}>{passType}</div>}
                </div>
            </div>
            <div className="forminput-error-msg" ref={error}>{props.msg}</div>
        </div>
    )
}
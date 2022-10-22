import { selectTarget, targetSliceAction } from '@/store/target.slice'
import { ChangeEvent, FocusEvent, KeyboardEvent, memo, MouseEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHexColor } from '@/hooks/useHexColor'
import './index.scss'
interface Props {
    title: string
    value: string
    tip: string
    type?: string
    changeValue: ((value: string) => void)
    ifValue?: ((value: string) => void)
}
export const StyleInput = (props: Props) => {
    const dispatch = useDispatch()
    const wrapper = useRef<any>(null)
    const [Ivalue, setValue] = useState<string>(props.value)
    let target = useSelector(selectTarget) as HTMLElement
    // after select el show the data
    useEffect(() => {
        const capName = props.value.substring(0, 3)
        if (props.type === 'color' || capName === 'rgb') {
            setValue(useHexColor(props.value))
        } else {
            setValue(props.value)
        }
    }, [props.value, target])
    const focusInput = () => {
        wrapper.current.classList.add('item-focus')
    }
    const blurInput = () => {
        wrapper.current.classList.remove('item-focus')
        if (Ivalue[Ivalue.length - 1] === '%' || Ivalue[0] === '#') {
            props.changeValue(Ivalue)
        } else {
            props.changeValue(Ivalue)
            if (props.ifValue) {
                props.ifValue(Ivalue)
            }
            // const dispatch = useDispatch()
            // dispatch(targetSliceAction.captureTarget(target))
        }
    }
    const enterInput = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            wrapper.current.classList.remove('item-focus')
            if (Ivalue[Ivalue.length - 1] === '%' || Ivalue[0] === '#') {
                props.changeValue(Ivalue)
            } else {
                props.changeValue(Ivalue)
                if (props.ifValue) {
                    props.ifValue(Ivalue)
                }
            }
        }


    }
    const updateValue = (e: { target: { value: any } }) => {
        setValue(e.target.value)
        // props.changeValue(e.target.value)
    }

    const resetTarget = () => {
        dispatch(targetSliceAction.updateState(false))
    }

    return (
        <div className="input-wrapper" ref={wrapper} onClick={resetTarget}>
            <div className="input-title">{props.title}</div>
            <input type={props.type}
                className='input-item'
                value={Ivalue}
                onChange={updateValue} onFocus={focusInput}
                onBlur={blurInput} 
                onKeyDown={enterInput}
            />
            <div className="tip">{props.tip}</div>
        </div>
    )
}

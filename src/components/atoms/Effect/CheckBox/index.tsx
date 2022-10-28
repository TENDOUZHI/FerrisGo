import { swiperSliceAction } from '@/store/swiper.slice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './index.scss'

interface Props {
    title: string,
    labelId: string,
    value: boolean,
    setValue: ((value: boolean) => void)
}

export const CheckBox = (props: Props) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState<boolean>(props.value)
    const onChange = () => {
        setValue(!value)
        // dispatch(swiperSliceAction.setAutoPlay(true))
        props.setValue(!value)
    }
    return (
        <label className="checkbox" htmlFor={props.labelId}>
            <div className="checkbox_title">{props.title}:</div>
            <input
                className="checkbox_input"
                type="checkbox"
                name=""
                id={props.labelId}
                checked={value}
                onChange={onChange}
            />
        </label>
    )
}
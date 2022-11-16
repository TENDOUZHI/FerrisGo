
import { useCompile } from '@/hooks/useCompile'
import { useVprops } from '@/hooks/useVprops'
import { selectDevice } from '@/store/device.slice'
import { enceSliceAction, selectEnce } from '@/store/ence.slice'
import { jumplayerSliceAction } from '@/store/jumplayer.slice'
import { messageSliceAction } from '@/store/message.slice'
import { selectTarget } from '@/store/target.slice'
import { invoke } from '@tauri-apps/api'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './index.scss'

export const EncapSet = () => {
    const dispatch = useDispatch()
    const ence = useSelector(selectEnce)
    const target = useSelector(selectTarget)
    const device = useSelector(selectDevice)
    const vprops = useVprops()
    const [value, setValue] = useState<string>('')
    const encapsulateElement = async () => {
        const encaEl = useCompile(target, device.width, false, vprops)
        await invoke('encapsulate_element', { element: encaEl, name: value }).then(() => {
            dispatch(enceSliceAction.capEneLen(ence.enceLen + 1))
            dispatch(messageSliceAction.setCorrect('提取组件成功'))
        }, () => {
            dispatch(messageSliceAction.setError('提取组件失败'))
        })
    }
    const onChange = (e: { target: { value: string } }) => {
        setValue(e.target.value)
    }
    const blur = () => {
        dispatch(jumplayerSliceAction.capCertainFn(encapsulateElement))
    }
    return (
        <div className="encainput">
            <div className="encainput_title">组件名称: </div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                onBlur={blur}
            />
        </div>

    )
}
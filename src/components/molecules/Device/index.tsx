import { useCompile } from '@/hooks/useCompile'
import { device, deviceSliceAction, selectDevice, selectDeviceList } from '@/store/device.slice'
import { selectRoot } from '@/store/source.slice'
import { routesSliceAction, selectCurRoutes } from '@/store/vapp.slice'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import arrow from '@/assets/arrow.png'
import './index.scss'
import { selectUser } from '@/store/user.slice'
import { selectWs } from '@/store/ws.slice'
interface Props {
    program_id: number
}
export const Device = (props: Props) => {
    const dispatch = useDispatch()
    const device = useSelector(selectDevice)
    const deviceList = useSelector(selectDeviceList)
    const current = useSelector(selectCurRoutes)
    const root = useSelector(selectRoot)
    const user = useSelector(selectUser)
    const ws = useSelector(selectWs)
    const choice = useRef<any>()
    const arrowRef = useRef<any>()
    const listItem = deviceList.map((item) => <li
        onClick={(e) => { updateDevice(item); toggle }}
        className=''
        key={item.id}
    >{item.name}</li>)
    const [show, setShow] = useState<boolean>(false)
    const toggle = () => {
        // if show == false ,show list
        if (!show) {
            setShow(true)
            choice.current.classList.remove('device-none')
            arrowRef.current.classList.add('device-rotate')
            setTimeout(() => {
                choice.current.classList.add('show-choice')
                const curVnode = {
                    id: current.id,
                    vNode: useCompile(root, device.width, false)
                }
                const curWnode = {
                    id: current.id,
                    vNode: useCompile(root, device.width, true)
                }
                // dispatch(routesSliceAction.updateVnode({
                //     curVnode, curWnode,
                //     user_id: user.id,
                //     program_id: props.program_id,
                //     ws: ws
                // }))
                document.addEventListener('click', deviceHide)
            }, 10)
        }
    }
    const deviceHide = (e: MouseEvent) => {
        console.log(123);
        
        if (e.target !== choice.current) {
            setShow(false)
            arrowRef.current.classList.remove('device-rotate')
            choice.current.classList.remove('show-choice')
            setTimeout(() => {
                choice.current.classList.add('device-none')
            }, 100)
            document.removeEventListener('click', deviceHide)
        }

    }


    const updateDevice = (device: device) => {
        dispatch(deviceSliceAction.captureDevice(device))
    }
    return (
        <div className="device-list">
            <div className="device-list-title" onClick={toggle}>
                <div className="device-list-title-main">{device.name}</div>
                <div className="device-list-title-img" ref={arrowRef}>
                    <img src={arrow} alt="" />
                </div>
            </div>
            <div className="device-list-choice device-none" ref={choice}>
                <ul>
                    {listItem}
                </ul>
            </div>
        </div>
    )
}
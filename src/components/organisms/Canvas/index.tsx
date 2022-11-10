import './index.scss'
import { DragEvent, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSource, sourceSliceAction } from '@/store/source.slice'
import { useDispatch } from 'react-redux'
import { selectState, targetSliceAction } from '@/store/target.slice'
import { useCompile } from '@/hooks/useCompile'
import { routesSliceAction, selectCurRoutes, selectRoutes, selectVapp } from '@/store/vapp.slice'
import { selectTarget } from '@/store/target.slice'
import { selectDevice } from '@/store/device.slice'
import { useRenderer } from '@/hooks/useRenderer'
import { Vapp, VNode, Vprops } from '@/store/ast'
import axios from 'axios'
import { selectUser } from '@/store/user.slice'
import { selectWs } from '@/store/ws.slice'
import { useHashCode } from '@/hooks/useHashCode'
import { nodeName, useCreateCom } from '@/hooks/useCreateCom'
import { SwiperMini } from '@/components/atoms/SwiperMini'
import { selectSwiper } from '@/store/swiper.slice'
import { useVprops } from '@/hooks/useVprops'
import { invoke } from '@tauri-apps/api'
import { selectCache } from '@/store/cache.slice'
import { selectUndo, undoSliceAction } from '@/store/undo.slice'
import { navigatorSliceAction, selectNav } from '@/store/navigator.slice'
import { NavBarItems } from '@/components/atoms/NavBarItems'
import { Blocking } from '@/components/molecules/Blocking'


interface Props {
    program_id: number,
    programData: string
}
export const Canvas = (props: Props) => {
    const dispatch = useDispatch()
    const current = useSelector(selectCurRoutes)
    const source = useSelector(selectSource)
    const device = useSelector(selectDevice)
    const target = useSelector(selectTarget)
    const state = useSelector(selectState)
    const Vapp = useSelector(selectVapp)
    const navigator = useSelector(selectNav)
    const user = useSelector(selectUser)
    const ws = useSelector(selectWs)
    const cache = useSelector(selectCache)
    const vprops = useVprops()
    const root = useRef<any>(null)
    const tabBar = useRef<any>(null)
    const [fitst, setFitst] = useState<boolean>(true)
    const [onece, setOnece] = useState<boolean>(true)
    const [block, setBlock] = useState<boolean>(false)
    const newSource = source?.cloneNode(true) as HTMLElement
    const [num, setNum] = useState<number>(0)
    const drag = (e: DragEvent) => {
        e.preventDefault()
    }
    const retrive = useCallback(async () => {
        await invoke('read_file_data', { filePath: cache.last_path }).then(res => {
            const data = JSON.parse(res as string)
            const index = data.routes[0].vnode
            console.log(data);
            
            // localStorage.setItem('vapp', res as string)
            dispatch(routesSliceAction.retriveDom())
            dispatch(navigatorSliceAction.retriveNavigator(data.navigator))
            setNum(Vapp.routes[current.id].size)
            invoke('save_operate', { newOperate: index })
            useRenderer(root.current, index as VNode, dispatch, vprops)
            setBlock(false)
        })
    }, [cache.last_path])
    useLayoutEffect(() => {
        dispatch(sourceSliceAction.initialRoot(root.current))
        dispatch(navigatorSliceAction.initialTabBar(tabBar.current))
    }, [])
    // initial root dom at the first time of render
    useLayoutEffect(() => {

        if (fitst) {
            setFitst(false);
            return;
        } else {
            setBlock(true)
            retrive()
        }
        const len = root?.current.childNodes.length as number
        const childs = root?.current.childNodes

        return (() => {
            // clear main display
            for (let i = len - 1; i >= 0; i--) {
                // @ts-ignore
                try {
                    root?.current.removeChild(childs[i])
                } catch (error) { }
            }
        })
    }, [props, cache.last_path])

    useEffect(() => {
        tabBar.current.style.borderColor = navigator.border_color
        if (navigator.tab_bar_status) {
            root.current.style.height = '93%'
            tabBar.current.style.height = '7%'
            tabBar.current.style.display = 'flex'
        } else {
            root.current.style.height = '100%'
            tabBar.current.style.height = '0'
            tabBar.current.style.display = 'none'
        }
    }, [navigator.tab_bar_status])

    useEffect(() => {
        // delete element
        document.onkeydown = (e: KeyboardEvent) => {
            if (e.key === 'Backspace' && state) {
                target?.remove()
                const curVnode = {
                    id: current.id,
                    vNode: useCompile(root.current, device.width, false, vprops)
                }
                const curWnode = {
                    id: current.id,
                    vNode: useCompile(root.current, device.width, true, vprops)
                }
                dispatch(routesSliceAction.updateVnode({
                    curVnode, curWnode,
                    user_id: user.id,
                    program_id: props.program_id,
                    ws: ws
                }))
            }
        }
    })
    const newdo = () => {
        if (onece) {
            setOnece(false);
            return;
        } else {
            invoke('save_operate', { newOperate: Vapp.routes[current.id].vnode })
            setOnece(true);
        }
    }

    const drop = (e: DragEvent) => {
        newdo()
        createDom(e)
        // update route vNode to redux
        const curVnode = {
            id: current.id,
            vNode: useCompile(root.current, device.width, false, vprops)
        }
        const curWnode = {
            id: current.id,
            vNode: useCompile(root.current, device.width, true, vprops)
        }
        dispatch(routesSliceAction.updateVnode({
            curVnode, curWnode,
            user_id: user.id,
            program_id: props.program_id,
            ws: ws
        }))
    }
    const createDom = (e: DragEvent) => {
        try {
            const target = e.target as HTMLElement
            let tagName = 'div';
            if (
                newSource.id === 'button'
                || newSource.id === 'image'
            ) {
                if (newSource.id === 'image') tagName = 'img'
                else tagName = newSource.id
            } else {
                tagName = newSource.tagName
            }

            const element = document.createElement(tagName)
            // @ts-ignore
            useCreateCom(newSource.id as nodeName, element, dispatch, vprops)
            console.log(element);
            dispatch(routesSliceAction.updateRouteSize({
                id: current.id,
                size: num + 1,
                // user_id: user.id,
                // program_id: props.program_id,
                // ws: ws 
            }))
            target.appendChild(element)
            // heighlight element 
            dispatch(sourceSliceAction.clearSource())
        } catch (error) { }


    }

    const saveData = async () => {
        const payload = {
            id: props.program_id,
            user_id: user.id,
            data: JSON.stringify(Vapp),
            program_name: Vapp.project_name,
            lastdate: new Date().toLocaleDateString().replaceAll('/', '-')
        }
        // console.log(payload);
        await axios.post('/programlist/save', payload).then(res => {
            // console.log(res);
        })
    }
    return (
        <>
        <Blocking show={block}/>
        <div className="canvas-wrapper">
            <div className="device" id='device'>
                <div className="device_content" ref={root} onDropCapture={drop} onDragOver={drag} onDrop={drop}>

                </div>
                <div className="device_tabBar" ref={tabBar}>
                    {
                        navigator.items.map(item => <NavBarItems
                            key={item.id}
                            id={item.id}
                            text={item.text}
                            color={navigator.font_color}
                            selectedStatus={item.select_status}
                            selectedColor={navigator.selected_color}
                            icon={item.icon}
                            selectedIcon={item.selected_icon}
                        />)
                    }
                </div>
            </div>
        </div>
        </>
    )
}
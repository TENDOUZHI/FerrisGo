import './index.scss'
import { createElement, DragEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectRouter, selectSource, sourceSliceAction } from '@/store/source.slice'
import { useDispatch } from 'react-redux'
import { selectState, targetSliceAction } from '@/store/target.slice'
import { useCompile } from '@/hooks/useCompile'
import { routesSliceAction, selectCurRoutes, selectVapp } from '@/store/vapp.slice'
import { selectTarget } from '@/store/target.slice'
import { selectDevice } from '@/store/device.slice'
import { createNode, useRenderer } from '@/hooks/useRenderer'
import { VNode } from '@/store/ast'
import axios from 'axios'
import { selectUser } from '@/store/user.slice'
import { selectWs } from '@/store/ws.slice'
import { nodeName, useCreateCom } from '@/hooks/useCreateCom'
import { useVprops } from '@/hooks/useVprops'
import { invoke } from '@tauri-apps/api'
import { selectCache } from '@/store/cache.slice'
import { navigatorSliceAction, selectNav } from '@/store/navigator.slice'
import { NavBarItems } from '@/components/atoms/NavBarItems'
import { blockSliceAction } from '@/store/block.slice'
import { useDeleteEl } from '@/hooks/useDeleteEl'
import { usePaste } from '@/hooks/usePaste'
import { useHashCode } from '@/hooks/useHashCode'
import { useChangeRoute } from '@/hooks/useChangeRoute'
import { cusEl, selectEnce } from '@/store/ence.slice'
import { routerElSliceAction, selectRouterEl, selectRouterShow, selectRouterStack } from '@/store/routerEl.slice'

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
    const routerRedux = useSelector(selectRouter)
    const routerShow = useSelector(selectRouterShow)
    const routerStack = useSelector(selectRouterStack)
    const ence = useSelector(selectEnce)
    const routerEl = useSelector(selectRouterEl)
    const vprops = useVprops()
    const changeRoute = useChangeRoute()
    const deleteEl = useDeleteEl()
    const [copy, cut, paste] = usePaste()
    const root = useRef<any>(null)
    const tabBar = useRef<any>(null)
    const router = useRef<any>(null)
    const back = useRef<any>(null)
    const [fitst, setFitst] = useState<boolean>(true)
    const [onece, setOnece] = useState<boolean>(true)
    const [one, setOne] = useState<boolean>(true)
    const [candelete, setCandelete] = useState<boolean>(true)
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
            invoke('flush_operate')
            dispatch(routesSliceAction.retriveDom(data))
            dispatch(navigatorSliceAction.retriveNavigator(data.navigator))
            setNum(Vapp.routes[current.id].size)
            invoke('save_operate', { newOperate: index })
            useRenderer(root.current, index as VNode, dispatch, vprops, changeRoute, true)
            dispatch(blockSliceAction.stopBlock())
        })
    }, [cache.last_path])
    useLayoutEffect(() => {
        dispatch(sourceSliceAction.initialRoot(root.current))
        dispatch(sourceSliceAction.initiaRouter(router.current))
        dispatch(navigatorSliceAction.initialTabBar(tabBar.current))
    }, [])
    // initial root dom at the first time of render
    useLayoutEffect(() => {
        if (fitst) {
            setFitst(false);
            return;
        } else {
            dispatch(blockSliceAction.setBlock())
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
        if (routerRedux.show) back.current.style.display = 'block'
        else back.current.style.display = 'none'
    }, [routerRedux])
    // useEffect(() => {
    //     if (routerShow) back.current.style.display = 'block'
    //     else back.current.style.display = 'none'
    // }, [routerShow])
    useEffect(() => {
        dispatch(routerElSliceAction.flushList(changeRoute))
    }, [routerEl])
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
        const deleteValidate = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.tagName === 'INPUT') {
                const tagType = target.getAttribute('type')
                if (tagType === 'text') setCandelete(false)
            } else setCandelete(true)
        }
        document.addEventListener('click', deleteValidate)
        document.onkeydown = (e: KeyboardEvent) => {
            // delete element
            if (e.key === 'Backspace' && state && candelete) {
                deleteEl()
            }
            // copy element
            if (e.key === 'c' && state) {
                copy()
            }
            // cut element
            if (e.key === 'x' && state) {
                cut()
            }
            // paste element
            if (e.key === 'v' && state) {
                paste()
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
            const custom = newSource.getAttribute('data-type')
            if (custom === 'custom') {
                const id = newSource.getAttribute('data-cusid')
                let element = document.createElement(tagName)
                const customEl = ence.enceList as cusEl[]
                for (let i = 0; i < customEl.length; i++) {
                    if (customEl[i].id === parseInt(id as string)) {
                        const createFamily = (vnodes: VNode[], el: HTMLElement): HTMLElement => {
                            vnodes.forEach(value => {
                                const child = createNode(value, dispatch, vprops, changeRoute)
                                const children = value.children
                                if (children.length >= 1) {
                                    createFamily(children, child)
                                }
                                const newClass = useHashCode(child.id)
                                child.className = newSource.id + '-' + newClass
                                el?.append(child)
                            })
                            return el
                        }
                        const vnode = customEl[i].vnode
                        const children = vnode?.children
                        element = createNode(vnode, dispatch, vprops, changeRoute, true)
                        if (children!.length >= 1) {
                            element = createFamily(children as VNode[], element)
                        }
                        const curClass = element.classList[0]
                        element.className = newSource.id + '-' + curClass
                        break;
                    }
                }
                const comName = newSource.getAttribute('data-name')
                const customSource = document.createElement('div')
                const customClassName = useHashCode(comName as string)
                customSource.classList.add(customClassName)
                customSource.id = comName as string
                customSource.appendChild(element)
                dispatch(routesSliceAction.updateRouteSize({
                    id: current.id,
                    size: num + 1,
                }))
                target.appendChild(customSource as HTMLElement)
                dispatch(sourceSliceAction.clearSource())
            } else {
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
                dispatch(routesSliceAction.updateRouteSize({
                    id: current.id,
                    size: num + 1,
                }))
                target.appendChild(element as HTMLElement)
                dispatch(sourceSliceAction.clearSource())
            }
        } catch (error) { }


    }

    const routerBack = () => {
        const routeInfo = routerStack[0]
        // console.log(routeInfo);
        // changeRoute(routeInfo.id, routeInfo.name, true)
        // dispatch(routerElSliceAction.back())
        dispatch(sourceSliceAction.routerHide())
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
            <div className="canvas-wrapper">
                <div className="canvas-wrapper_back" ref={back} onClick={routerBack}>{'<'}</div>
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
                                connectId={item.path_id}
                                path={item.path}
                            />)
                        }
                    </div>
                    <div className="device_router" ref={router}></div>
                </div>
            </div>
        </>
    )
}
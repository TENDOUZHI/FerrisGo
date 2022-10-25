import { useCompile } from '@/hooks/useCompile'
import { useRenderer } from '@/hooks/useRenderer'
import { VNode } from '@/store/ast'
import { selectDevice } from '@/store/device.slice'
import { routesSliceAction, selectCurRoutes, selectRoutes, selectRouteSize, selectVapp, selectWapp } from '@/store/vapp.slice'
import { selectRoot } from '@/store/source.slice'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import './index.scss'
import { RoutePage } from '@/components/atoms/RoutePage'
import { selectUser } from '@/store/user.slice'
import { selectWs } from '@/store/ws.slice'
import { selectSwiper } from '@/store/swiper.slice'
interface Props {
    program_id: number
}
export const Structure = (props: Props) => {
    const dispatch = useDispatch()
    const route = useSelector(selectRoutes)
    const root = useSelector(selectRoot)
    const device = useSelector(selectDevice)
    const current = useSelector(selectCurRoutes)
    const vapp = useSelector(selectVapp)
    const wapp = useSelector(selectWapp)
    const user = useSelector(selectUser)
    const ws = useSelector(selectWs)
    const swiperRedux = useSelector(selectSwiper)
    const routeDom = useRef<Array<any>>([])
    const layer = useRef<any>()
    useEffect(() => {
        dispatch(routesSliceAction.retriveSize())
        // console.log(vapp);

    }, [])
    const createPage = () => {
        const name = 'new route'
        dispatch(routesSliceAction.appendRoutes({
            name: name,
            user_id: user.id,
            program_id: props.program_id,
            ws: ws
        }))
    }
    const changeRoute = (name: string, id: number): void => {
        // update vNode before switch route
        updateVNode()
        // change leftlist item style
        changeStyle(name, id)
        // switch route
        switchRoute(name, id)

    }
    const updateVNode = () => {
        const curVnode = {
            id: current.id,
            vNode: useCompile(root, device.width, false, swiperRedux)
        }
        const curWnode = {
            id: current.id,
            vNode: useCompile(root, device.width, true, swiperRedux)
        }
        dispatch(routesSliceAction.updateVnode({
            curVnode, curWnode,
            user_id: user.id,
            program_id: props.program_id,
            ws: ws
        }))
    }
    const changeStyle = (name: string, id: number) => {
        dispatch(routesSliceAction.changeRoutes({ name, id }))
        routeDom.current.forEach((dom: HTMLElement, index: number) => {
            if (index !== id && dom) {
                try {
                    dom.classList.remove('selected')
                } catch (error) { }
            } else {
                try {
                    dom.classList.add('selected')
                } catch (error) { }

            }
        })
    }
    const switchRoute = (name: string, id: number) => {
        const len = root?.childNodes.length as number
        const childs = root?.childNodes
        console.log(route);

        // judge whether user click cur route
        // if is nothing changed
        if (id !== current.id) {
            // clear main display
            for (let i = len - 1; i >= 0; i--) {
                // @ts-ignore
                root?.removeChild(childs[i])
            }
            // console.log(route);

            // render dom
            try {
                useRenderer(root as HTMLElement, route[id].vnode as VNode, dispatch, swiperRedux)
            } catch (error) { }

        }
    }

    return (
        <div className='page-structure'>
            <div className="page-structure-layer none" ref={layer}></div>
            <div className='page-structure-create' onClick={createPage}>create page + </div>
            <ul className='page-structure-wrapper'>
                {route.map(item =>
                    item.state === 0 &&
                    <RoutePage key={item.id} program_id={props.program_id} value={item.name} id={item.id} changeRoute={changeRoute} />
                )}

            </ul>
        </div>
    )
}
import { useChangeRoute } from '@/hooks/useChangeRoute'
import { jumplayerSliceAction } from '@/store/jumplayer.slice'
import { selectNav } from '@/store/navigator.slice'
import { selectTarget } from '@/store/target.slice'
import { selectVapp } from '@/store/vapp.slice'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { ListMenu } from '../Effect/ListMenu'
import './index.scss'

export const RouterSet = () => {
    const dispatch = useDispatch()
    const vapp = useSelector(selectVapp)
    const target = useSelector(selectTarget)
    const changeRoute = useChangeRoute()
    const [paths, setPaths] = useState<Array<string>>([])
    const [pathId, setPathId] = useState<Array<number>>([])
    const [curPath, setCurPath] = useState<string>('无路由')
    const map = useRef<Map<number, string>>(new Map())
    useEffect(() => {
        
        if (target !== null) {
            const router = target.getAttribute('data-routerid')
            if (router !== null) {
                const id = parseInt(router)
                const name = map.current.get(id) as string
                setCurPath(name)
                target.addEventListener('mousedown', (e: MouseEvent) => {
                    if (e.button === 1) {
                        changeRoute(id, name)
                    }
                })
            }
            else setCurPath('无路由')
        }
    }, [target])
    useEffect(() => {
        paths.length = 0
        pathId.length = 0
        vapp.routes.forEach((route) => {
            if (route.state === 0) {
                pathId.push(route.id)
                paths.push(route.name)
                setPaths([...paths])
                setPathId([...pathId])
                map.current.set(route.id, route.name)
            }
        })
    }, [vapp])
    useEffect(() => {
        dispatch(jumplayerSliceAction.capCertainFn(certainFn))
    }, [])
    const certainFn = () => { }
    return (
        <div className="routerset">
            <div className="routerset_title">目标路由: </div>
            <div className="routerset_mian">
                <ListMenu
                    type='router'
                    currentPath={curPath}
                    value={paths}
                    pathId={pathId}
                    left='145px'
                    right='0px'
                    top='105px'
                    bottom='0'
                />
            </div>
        </div>
    )
}
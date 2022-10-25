import './index.scss'
import autoSave from '@/assets/auto save.png'
import { useDispatch, useSelector } from 'react-redux'
import { useLayoutEffect, useRef, useState } from 'react'
import { selectSwiper, swiperSliceAction } from '@/store/swiper.slice'
import { messageSliceAction } from '@/store/message.slice'
import { useRenderer } from '@/hooks/useRenderer'
import { routesSliceAction, selectCurRoutes, selectProgramId } from '@/store/vapp.slice'
import { selectDevice } from '@/store/device.slice'
import { selectRoot } from '@/store/source.slice'
import { useCompile } from '@/hooks/useCompile'
import { selectUser } from '@/store/user.slice'
import { selectWs } from '@/store/ws.slice'

interface Props {
    id: number,
    content: string
}

export const SwiperItem = (props: Props) => {
    const dispatch = useDispatch()
    const current = useSelector(selectCurRoutes)
    const swiper = useSelector(selectSwiper)
    const root = useSelector(selectRoot)
    const device = useSelector(selectDevice)
    const user = useSelector(selectUser)
    const ws = useSelector(selectWs)
    const program_id = useSelector(selectProgramId)
    const [defaultImg, setDefaultImg] = useState<string>(props.content)
    const reader = useRef<FileReader>(new FileReader())
    const [curNode, setCurNode] = useState<any>(null)
    useLayoutEffect(() => {
        if (root !== null) {
            // clear screen
            const len = root!.childNodes.length as number
            const childs = root!.childNodes
            for (let i = len - 1; i >= 0; i--) {
                // @ts-ignore
                try {
                    root!.removeChild(childs[i])
                } catch (error) { }
            }
            // set into real dom
            setTimeout(() => {
                useRenderer(root as HTMLElement, curNode, dispatch, swiper)
            })
        }

    }, [curNode])
    const onChange = (e: { target: { value: any, files: any } }) => {
        const file = e.target.files[0]
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
            reader.current.readAsDataURL(file)
            reader.current.onload = (res) => {
                const size = Math.round(res.total / 1024)
                if (size <= 10000) {
                    setDefaultImg(res.target?.result as string)
                    dispatch(swiperSliceAction.setContent({ id: props.id, content: res.target?.result }))
                    compile()
                    // useRenderer(root, '', dispatch, swiper)
                } else {
                    dispatch(messageSliceAction.setError('文件大小不得大于10M'))
                    console.error('文件大于10M');
                }
            }
        } else {
            return
        }
    }
    const compile = () => {
        const curVnode = {
            id: current.id,
            vNode: useCompile(root, device.width, false, swiper)
        }
        const curWnode = {
            id: current.id,
            vNode: useCompile(root, device.width, false, swiper)
        }
        dispatch(routesSliceAction.updateVnode({
            curVnode, curWnode,
            user_id: user.id,
            program_id: program_id,
            ws: ws
        }))
        setCurNode(curVnode.vNode)
    }

    return (
        <div className="swiperitem">
            <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="swiperitem_file"
                onChange={onChange}
            />
            <img src={defaultImg} alt="" className="swiperitem_img" />
        </div>
    )
}
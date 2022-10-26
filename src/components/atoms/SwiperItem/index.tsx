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
import { useUpdate } from '@/hooks/useUpdate'

interface Props {
    id: number,
    content: string
}

export const SwiperItem = (props: Props) => {
    const dispatch = useDispatch()
    const [defaultImg, setDefaultImg] = useState<string>(props.content)
    const reader = useRef<FileReader>(new FileReader())
    const [pivot, preUpdate, update] = useUpdate()
    // useUpdate()
    useLayoutEffect(() => {
        update()
    }, [pivot])
    const onChange = (e: { target: { value: any, files: any } }) => {
        const file = e.target.files[0]
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
            reader.current.readAsDataURL(file)
            reader.current.onload = (res) => {
                const size = Math.round(res.total / 1024)
                if (size <= 10000) {
                    setDefaultImg(res.target?.result as string)
                    dispatch(swiperSliceAction.setContent({ id: props.id, content: res.target?.result }))
                    // compile()
                    preUpdate()
                    // useRenderer(root, '', dispatch, swiper)
                } else {
                    dispatch(messageSliceAction.setError('文件大小不得大于10M'))
                }
            }
        } else {
            return
        }
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
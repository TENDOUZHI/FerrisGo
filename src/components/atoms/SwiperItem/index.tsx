import './index.scss'
import { useDispatch } from 'react-redux'
import { useLayoutEffect, useRef, useState } from 'react'
import { selectSwiper, swiperSliceAction } from '@/store/swiper.slice'
import { messageSliceAction } from '@/store/message.slice'
import { useUpdate } from '@/hooks/useUpdate'
import { useSelector } from 'react-redux'

interface Props {
    id: number,
    content: string
}

export const SwiperItem = (props: Props) => {
    const dispatch = useDispatch()
    const [defaultImg, setDefaultImg] = useState<string>(props.content)
    const reader = useRef<FileReader>(new FileReader())
    const [preUpdate] = useUpdate()
    const onChange = (e: { target: { value: any, files: any } }) => {
        const file = e.target.files[0]
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
            reader.current.readAsDataURL(file)
            reader.current.onload = (res) => {
                const size = Math.round(res.total / 1024)
                if (size <= 10000) {
                    setDefaultImg(res.target?.result as string)
                    dispatch(swiperSliceAction.setContent({ id: props.id, content: res.target?.result }))
                    preUpdate()
                } else {
                    dispatch(messageSliceAction.setError('文件大小不得大于10M'))
                }
            }
        }
    }
    const deleteContent = () => {
        dispatch(swiperSliceAction.deleteItem({ id: props.id }))
    }

    return (
        <div className="swiperitem">
            <div className="swiperitem_cancel" onClick={() => { deleteContent(); }}>x</div>
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
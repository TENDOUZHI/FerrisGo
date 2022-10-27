import { useUpdate } from "@/hooks/useUpdate"
import { imageSliceAction } from "@/store/image.slice"
import { messageSliceAction } from "@/store/message.slice"
import { swiperSliceAction } from "@/store/swiper.slice"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import defaultImgs from '@/assets/default.png'

interface Props {
    class: HTMLElement,
    src: string
}

export const FileInput = (props: Props) => {
    const dispatch = useDispatch()
    const reader = useRef<FileReader>(new FileReader())
    const [defaultImg, setDefaultImg] = useState<string>(props.src)
    const preUpdate = useUpdate()
    useEffect(() => {
        if(props.src) setDefaultImg(props.src)
        else setDefaultImg(defaultImgs)
    }, [props])
    const onChange = (e: { target: { value: any, files: any } }) => {
        const file = e.target.files[0]
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
            reader.current.readAsDataURL(file)
            reader.current.onload = (res) => {
                const size = Math.round(res.total / 1024)
                if (size <= 10000) {
                    setDefaultImg(res.target?.result as string)
                    dispatch(imageSliceAction.updateSrc({ className: props.class.classList[0], src: res.target?.result }))
                    preUpdate()
                } else {
                    dispatch(messageSliceAction.setError('文件大小不得大于10M'))
                }
            }
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
import { useUpdate } from '@/hooks/useUpdate'
import { imageSliceAction } from '@/store/image.slice'
import { messageSliceAction } from '@/store/message.slice'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import './index.scss'
import defaultImgs from '@/assets/default.png'

export const NavIcon = () => {

    const dispatch = useDispatch()
    const reader = useRef<FileReader>(new FileReader())
    const [defaultImg, setDefaultImg] = useState<string>(defaultImgs)
    const preUpdate = useUpdate()
    const onChange = (e: { target: { value: any, files: any } }) => {
        const file = e.target.files[0]
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
            reader.current.readAsDataURL(file)
            reader.current.onload = (res) => {
                const size = Math.round(res.total / 1024)
                if (size <= 10000) {
                    setDefaultImg(res.target?.result as string)
                    // dispatch(imageSliceAction.updateSrc({ className: props.class.classList[0], src: res.target?.result }))
                    // preUpdate()
                } else {
                    dispatch(messageSliceAction.setError('文件大小不得大于10M'))
                }
            }
        }
    }
    return (
        <div className="navicon">
            <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="navicon_file"
                onChange={onChange}
            />
            <img src={defaultImg} alt="" className="navicon_img" />
        </div>
    )
}
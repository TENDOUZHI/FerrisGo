import { useUpdate } from '@/hooks/useUpdate'
import { imageSliceAction } from '@/store/image.slice'
import { messageSliceAction } from '@/store/message.slice'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import './index.scss'
import defaultImgs from '@/assets/default.png'
import { navigatorSliceAction } from '@/store/navigator.slice'

interface Props {
    id: number
    type: 'defaultIcon' | 'selectedIcon'
}

export const NavIcon = (props: Props) => {

    const dispatch = useDispatch()
    const reader = useRef<FileReader>(new FileReader())
    const [defaultImg, setDefaultImg] = useState<string>(defaultImgs)
    const onChange = (e: { target: { value: any, files: any } }) => {
        const file = e.target.files[0]
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
            reader.current.readAsDataURL(file)
            reader.current.onload = (res) => {
                const size = Math.round(res.total / 1024)
                if (size <= 10000) {
                    const image = res.target?.result as string
                    setDefaultImg(image)
                    if(props.type === 'defaultIcon') dispatch(navigatorSliceAction.updateIcon({id: props.id, icon: image}))
                    else dispatch(navigatorSliceAction.updateSelectedIcon({id: props.id, selectedIcon: image}))
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
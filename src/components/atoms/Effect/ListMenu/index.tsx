import './index.scss'
import arrow from '@/assets/arrow.png'
import { useDispatch } from 'react-redux'
import { useListMenu } from '@/hooks/effective/useListMenu'
import { useRef, useState } from 'react'
import selected from '@/assets/selected.png'

interface Props {
    // title: string,
    value: Array<string>,
    left: string
    top: string
    right: string
    bottom: string
    // setValue: ((value: string) => void)
}

export const ListMenu = (props: Props) => {
    const dispatch = useDispatch()
    const ul = useRef<any>()
    const [title, setTitle] = useListMenu(dispatch, 'icon')
    const [show, setShow] = useState<boolean>(false)
    const demonstrate = () => {
        if(!show) {
            ul.current.style.display = 'block'
            setTimeout(()=>{
                ul.current.style.opacity = '1'
                ul.current.style.transform = 'scale(100%)'
                document.addEventListener('click',autoHide)
            })
            setShow(true)
        }
        const autoHide = (e: MouseEvent) => {
            ul.current.style.display = 'none'
            ul.current.style.opacity = '0'
            ul.current.style.transform = 'scale(95%)'
            setShow(false)
            document.removeEventListener('click', autoHide)
        }
    }
    return (
        <div className='listmenu' onClick={demonstrate}>
            <div className="listmenu_option">
                <span>{title}</span>
                <ul className="listmenu_option_ul" ref={ul} style={{ left: props.left, top: props.top, right: props.right, bottom: props.bottom }}>
                    {
                        props.value.map((item, index) => {
                            return <li key={index} onClick={() => setTitle(item)} className="listmenu_option_ul_li">
                                <div className="listmenu_option_ul_li_selected">
                                    {item === title && <img src={selected} alt="" />}
                                </div>
                                <div className="listmenu_option_ul_li_item"> {item}</div>
                               
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="listmenu_arrow">
                <img src={arrow} alt="" />
            </div>
        </div>
    )
}
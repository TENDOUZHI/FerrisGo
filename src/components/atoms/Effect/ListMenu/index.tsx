import './index.scss'
import arrow from '@/assets/arrow.png'
import { useDispatch } from 'react-redux'
import { component, useListMenu } from '@/hooks/effective/useListMenu'
import { useEffect, useRef, useState } from 'react'
import selected from '@/assets/selected.png'

interface Props {
    // title: string,
    type: component
    value: Array<string>,
    currentPath: string
    left: string
    top: string
    right: string
    bottom: string
    navId?: number
    pathId?: Array<number>
    // setValue: ((value: string) => void)
}

export const ListMenu = (props: Props) => {
    const dispatch = useDispatch()
    const [curPath, setCurPath] = useState<string>(props.value[0])
    const ul = useRef<any>()
    const [title, setTitle] = useListMenu(props.type, curPath, props.navId)
    const [show, setShow] = useState<boolean>(false)
    useEffect(() => {
        setCurPath(props.currentPath)
    }, [props.currentPath])
    const pathId = (index: number) => {
        if(props.pathId) return props.pathId[index]
        else return undefined
    }
    const demonstrate = () => {
        if (!show) {
            ul.current.style.display = 'block'
            setTimeout(() => {
                ul.current.style.opacity = '1'
                ul.current.style.transform = 'scale(100%)'
                document.addEventListener('click', autoHide)
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
                            return <li key={index} onClick={() => setTitle(item, pathId(index))} className="listmenu_option_ul_li">
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
import { useEffect, useRef, useState } from 'react'
import './index.scss'
interface Props {
    download: boolean
    text: string
    count: number
}
export const DownLoad = (props: Props) => {
    const wrapper = useRef<any>()
    const svg = useRef<any>()
    const text = useRef<any>()
    const texting = useRef<any>()
    useEffect(() => {
        if (!props.download) {
            text.current.style.display = 'block'
            texting.current.style.display = 'none'
            setTimeout(() => {
                text.current.style.transform = 'translateY(0%)'
                texting.current.style.transform = 'translateY(-100%)'
            })

            wrapper.current.style.width = '100%'
            wrapper.current.classList.add('wrapper_download_ready')
            wrapper.current.classList.remove('wrapper_donwloading')
            svg.current.classList.remove('svg_downloading')
        } else {
            setTimeout(() => {
                text.current.style.transform = 'translateY(100%)'
                texting.current.style.transform = 'translateY(0%)'
            })
            text.current.style.display = 'none'
            texting.current.style.display = 'block'
            wrapper.current.style.width = '120%'
            wrapper.current.classList.remove('wrapper_download_ready')
            wrapper.current.classList.add('wrapper_donwloading')
            svg.current.classList.add('svg_downloading')
        }
    }, [props])

    return (
        <div className="download" ref={wrapper}>
            <div className="download_icon">
                <svg className="download_icon_svg" ref={svg}>
                    {
                        !props.download
                            ? <>
                                <path className="download_icon_svg_path" d='M20,28 L32,19 L20,10'></path>
                                <path className="download_icon_svg_path" d='M30,19 L11,19'></path>
                            </>
                            : <circle className="download_icon_svg_circle" cx='50%' cy='50%' r='12'></circle>
                    }


                </svg>
            </div>
            <div className="download_text">
                <span className="download_text_spaning" ref={texting}>{props.text}: {props.count}s</span>
                <span className="download_text_span" ref={text}>DownLoad</span>
            </div>
        </div>
    )
}
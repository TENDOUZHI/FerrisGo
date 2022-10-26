import { usePurge } from '@/hooks/usePurge'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import arrow from '@/assets/arrow.png'
import { Dispatch } from '@reduxjs/toolkit'
import { CheckBox } from '@/components/atoms/CheckBox'
import { useGetValue } from '@/hooks/useGetValue'
import { useSelector } from 'react-redux'
import { selectSwiper, swiperSliceAction } from '@/store/swiper.slice'
import { useSetCheckBox } from '@/hooks/useSetCheckBox'
import { StyleInput } from '@/components/atoms/StyleInput'
import { SwiperItem } from '@/components/atoms/SwiperItem'
import { useUpdate } from '@/hooks/useUpdate'
import { useDispatch } from 'react-redux'
interface Props {
    target: HTMLElement,
    dispatch: Dispatch
}
export const SwiperSet = (props: Props) => {
    const dispatch = useDispatch()
    const container = useRef<any>()
    const arrowRef = useRef<any>()
    const whole = useRef<any>()
    const swiper = useSelector(selectSwiper)
    const [update] = useUpdate()
    const [autoplay, setAutoPlay] = useSetCheckBox('autoPlay', props.dispatch)
    const [pagination, setPagination] = useSetCheckBox('pagination', props.dispatch)
    const [scrollbar, setScrollbar] = useSetCheckBox('scrollbar', props.dispatch)
    const [delay, setDelay] = useGetValue('swiper', props.dispatch, 'autoPlayDelay')
    const [show, setShow] = useState<boolean>(false)
    const ensure = useRef<any>()
    const purgeContainer = usePurge(container.current, arrowRef.current, 76 + 48 + 52 + (108 * (swiper.items.length - swiper.garbage)))
    useLayoutEffect(() => {
        whole.current.style.display = 'none'
        if (props.target !== null) {
            if (props.target.id === 'swiper') {
                whole.current.style.display = 'flex'
            }
        }
    }, [props])
    const deleteItem = () => {
        update()
        ensure.current.style.opacity = 0
        setTimeout(() => {
            setShow(false)
        }, 100)
    }
    const appendItem = () => {
        dispatch(swiperSliceAction.appendContent())
        update()
    }
    useLayoutEffect(() => {
        if (swiper.garbage > 0) {
            setShow(true)
            setTimeout(() => {
                ensure.current.style.opacity = 1
            })
        }
    }, [swiper.garbage])
    return (
        <div className="attribute" ref={whole}>
            <div className='attribute-title' onClick={purgeContainer}>
                <span>轮播图</span>
                <img src={arrow} ref={arrowRef} alt="" />
            </div>
            <div className="attribute-content" ref={container}>

                <CheckBox title='自动播放' labelId='autoplay' value={autoplay} setValue={setAutoPlay} />
                <CheckBox title='轮播点' labelId='pagination' value={pagination} setValue={setPagination} />
                <StyleInput tip='播放间隔' title='DL' value={delay} changeValue={setDelay} hoc={true} />
                <CheckBox title='滚动条' labelId='scrollbar' value={scrollbar} setValue={setScrollbar} />
                <div className="attribute-content-create">
                    <div className="attribute-content-create-btn" onMouseUp={appendItem}>
                        添加图片
                    </div>
                </div>
                {swiper.items.map(item =>
                    item.status &&
                    <SwiperItem
                        key={item.id}
                        id={item.id}
                        content={item.content} />)}
                <div className="attribute-content-sure">
                    {
                        show &&
                        <div className="attribute-content-sure-btn" ref={ensure} onMouseUp={deleteItem}>
                            确认删除
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
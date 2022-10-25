import { usePurge } from '@/hooks/usePurge'
import { useRef } from 'react'
import arrow from '@/assets/arrow.png'
import './index.scss'
import { Dispatch } from '@reduxjs/toolkit'
import { CheckBox } from '@/components/atoms/CheckBox'
import { useGetValue } from '@/hooks/useGetValue'
import { useSelector } from 'react-redux'
import { selectSwiper } from '@/store/swiper.slice'
import { useSetCheckBox } from '@/hooks/useSetCheckBox'
interface Props {
    dispatch: Dispatch
}
export const SwiperSet = (props: Props) => {
    const container = useRef<any>()
    const arrowRef = useRef<any>()
    const swiper = useSelector(selectSwiper)
    const [autoplay, setAutoPlay] = useSetCheckBox('autoPlay', props.dispatch)
    const [pagination, setPagination] = useSetCheckBox('pagination', props.dispatch)
    const [scrollbar, setScrollbar] = useSetCheckBox('scrollbar', props.dispatch)
    const purgeContainer = usePurge(container.current, arrowRef.current, 76)
    return (
        <div className="attribute">
            <div className='attribute-title' onClick={purgeContainer}>
                <span>轮播图</span>
                <img src={arrow} ref={arrowRef} alt="" />
            </div>
            <div className="attribute-content" ref={container}>
                <CheckBox title='自动播放' labelId='autoplay' value={autoplay} setValue={setAutoPlay} />
                <CheckBox title='轮播点' labelId='pagination' value={pagination} setValue={setPagination} />
                <CheckBox title='滚动条' labelId='scrollbar' value={scrollbar} setValue={setScrollbar} />
            </div>
        </div>
    )
}
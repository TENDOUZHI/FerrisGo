import { Align } from '@/components/molecules/Align'
import { Basicstyle } from '@/components/molecules/Basicstyle'
import { Bgc } from '@/components/molecules/BGC'
import { Border } from '@/components/molecules/Border'
import { Display } from '@/components/molecules/Display'
import { Margin } from '@/components/molecules/Margin'
import { Padding } from '@/components/molecules/Padding'
import { SwiperSet } from '@/components/molecules/SwiperSet'
import { selectTarget } from '@/store/target.slice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import './index.scss'
interface Props {
}
export const RighttList = (props: Props) => {
    let target = useSelector(selectTarget) as HTMLElement
    const dispatch = useDispatch()
    return (
        <div className="rightlist-wrapper">
            <SwiperSet dispatch={dispatch}/>
            <Basicstyle target={target} dispatch={dispatch} />
            <Margin target={target} dispatch={dispatch} />
            <Padding target={target} dispatch={dispatch} />
            <Border target={target} dispatch={dispatch} />
            <Bgc target={target} dispatch={dispatch} />
            <Display target={target} dispatch={dispatch} />
        </div>
    )
}
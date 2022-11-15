import { Align } from '@/components/molecules/Align'
import { Basicstyle } from '@/components/molecules/Basicstyle'
import { Bgc } from '@/components/molecules/BGC'
import { Border } from '@/components/molecules/Border'
import { Display } from '@/components/molecules/Display'
import { Encapsulate } from '@/components/molecules/Encapsulate'
import { IconSet } from '@/components/molecules/IconSet'
import { ImageSet } from '@/components/molecules/ImageSet'
import { Margin } from '@/components/molecules/Margin'
import { Padding } from '@/components/molecules/Padding'
import { SwiperSet } from '@/components/molecules/SwiperSet'
import { selectTarget, targetSliceAction } from '@/store/target.slice'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import './index.scss'
interface Props {
}
export const RighttList = (props: Props) => {
    const dispatch = useDispatch()
    let target = useSelector(selectTarget) as HTMLElement
    const [id, setId] = useState<string>('')
    const [ferrisCom, setFerrisCom] = useState<boolean>(false)
    useLayoutEffect(() => {
        if (target !== null) setId(target.id)
        document.addEventListener('click', ((e: MouseEvent) => {
            if (target === e.target) setFerrisCom(true)
            else {
                setFerrisCom(false)
                dispatch(targetSliceAction.captureTarget(null))
            }
        }))
    }, [target])
    return (
        <div className="rightlist-wrapper">
            {
                ferrisCom &&
                <Encapsulate />
            }
            <IconSet target={target} dispatch={dispatch} />
            <ImageSet target={target} dispatch={dispatch} />
            <SwiperSet target={target} dispatch={dispatch} />
            <Basicstyle target={target} dispatch={dispatch} />
            <Margin target={target} dispatch={dispatch} />
            <Padding target={target} dispatch={dispatch} />
            <Border target={target} dispatch={dispatch} />
            <Bgc target={target} dispatch={dispatch} />
            <Display target={target} dispatch={dispatch} />
        </div>
    )
}
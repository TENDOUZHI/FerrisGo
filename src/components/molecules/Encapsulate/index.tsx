import './index.scss'
import { useDispatch } from 'react-redux'
import { jumplayerSliceAction } from '@/store/jumplayer.slice'
import { EncapSet } from '@/components/atoms/EncapSet'

export const Encapsulate = () => {
    const dispatch = useDispatch()
    const showLayer = () => {
        dispatch(jumplayerSliceAction.setShow())
        dispatch(jumplayerSliceAction.setTitle('提取组件设置'))
        dispatch(jumplayerSliceAction.capChildren(<EncapSet />))
    }
    
    return (
        <>
            <div className="encapsulate">
                <div className="encapsulate_arrow">&#8617;</div>
                <div className="encapsulate_btn">
                    <span onClick={showLayer}>提取成组件</span>
                </div>
            </div>
        </>
    )
}
import { StyleInput } from '@/components/atoms/StyleInput'
import { useGetValue } from '@/hooks/useGetValue'
import { Dispatch } from '@reduxjs/toolkit'
import './index.scss'
interface Props {
    target: HTMLElement,
    dispatch: Dispatch
}
export const Padding = (props: Props) => {
    // align row column center
    const target = props.target
    const [paddingTop, setpaddingTop] = useGetValue('padding-top',props.dispatch)
    const [paddingBottom, setpaddingBottom] = useGetValue('padding-bottom',props.dispatch)
    const [paddingLeft,setpaddingLeft] = useGetValue('padding-left',props.dispatch)
    const [paddingRight, setpaddingRight] = useGetValue('padding-right',props.dispatch)
    return (
        <div className="attribute">
            <div className='attribute-title'>内边距</div>
            <div className="attribute-content">
                <StyleInput tip='上内距' title='PT' value={paddingTop} changeValue={setpaddingTop} />
                <StyleInput tip='下内距' title='PB' value={paddingBottom} changeValue={setpaddingBottom} />
                <StyleInput tip='左内距' title='PL' value={paddingLeft} changeValue={setpaddingLeft} />
                <StyleInput tip='右内距' title='PR' value={paddingRight} changeValue={setpaddingRight} />
            </div>

        </div>
    )
}
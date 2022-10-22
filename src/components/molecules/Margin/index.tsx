import { StyleInput } from '@/components/atoms/StyleInput'
import { useGetValue } from '@/hooks/useGetValue'
import { Dispatch } from '@reduxjs/toolkit'
import './index.scss'
interface Props {
    target: HTMLElement,
    dispatch: Dispatch
}
export const Margin = (props: Props) => {
    // align row column center
    const target = props.target
    const [marginTop, setMarginTop] = useGetValue('margin-top',props.dispatch)
    const [marginBottom, setMarginBottom] = useGetValue('margin-bottom',props.dispatch)
    const [marginLeft,setMarginLeft] = useGetValue('margin-left',props.dispatch)
    const [marginRight, setMarginRight] = useGetValue('margin-right',props.dispatch)
    return (
        <div className="attribute">
            <div className='attribute-title'>外边距</div>
            <div className="attribute-content">
                <StyleInput tip='上边距' title='MT' value={marginTop} changeValue={setMarginTop} />
                <StyleInput tip='下边距' title='MB' value={marginBottom} changeValue={setMarginBottom} />
                <StyleInput tip='左边距' title='ML' value={marginLeft} changeValue={setMarginLeft} />
                <StyleInput tip='右边距' title='MR' value={marginRight} changeValue={setMarginRight} />
            </div>

        </div>
    )
}
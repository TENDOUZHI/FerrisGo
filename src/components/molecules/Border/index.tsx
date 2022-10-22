import { StyleInput } from "@/components/atoms/StyleInput"
import { useGetValue } from "@/hooks/useGetValue"
import { Dispatch } from "@reduxjs/toolkit"
import './index.scss'

interface Props {
    target: HTMLElement,
    dispatch: Dispatch
}
export const Border = (props: Props) => {
    const target = props.target
    const [borderWidth, setBorderWidth] = useGetValue('border-width',props.dispatch)
    const [borderColor, setBorderColor] = useGetValue('border-color',props.dispatch)

    return (
        <div className="attribute">
            <div className='attribute-title'>边框</div>
            <div className="attribute-content">
                <StyleInput tip='边框宽度' title="BW" value={borderWidth} changeValue={setBorderWidth}/>
                <StyleInput tip='边框颜色' title="BC" value={borderColor} changeValue={setBorderColor}/>
            </div>
        </div>
    )
}
import { StyleInput } from "@/components/atoms/StyleInput"
import { useGetValue } from "@/hooks/useGetValue"
import { Dispatch } from "@reduxjs/toolkit"
import './index.scss'

interface Props {
    target: HTMLElement,
    dispatch: Dispatch
}
export const Bgc = (props: Props) => {
    const target = props.target
    const [bgc, setBgc] = useGetValue('background-color',props.dispatch)
    const [opacity, setOpacity] = useGetValue( 'opacity',props.dispatch)

    return (
        <div className="attribute">
            <div className='attribute-title'>填充</div>
            <div className="attribute-content">
                <StyleInput type="color" tip='背景颜色' title="Bgc" value={bgc} changeValue={setBgc}/>
                <StyleInput tip='透明度' title="op" value={opacity} changeValue={setOpacity}/>
            </div>
        </div>
    )
}
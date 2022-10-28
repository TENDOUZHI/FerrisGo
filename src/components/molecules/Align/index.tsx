import { StyleInput } from '@/components/atoms/Effect/StyleInput'
import { useGetValue } from '@/hooks/useGetValue'
import './index.scss'
interface Props {
    target: HTMLElement
}
export const Align = (props: Props) => {
    // align row column center
    const target = props.target
    // const [marginTop, setMarginTop] = useGetValue(target, 'margin-top')
    // const [marginBottom, setMarginBottom] = useGetValue(target, 'margin-bottom')
    // const [marginLeft,setMarginLeft] = useGetValue(target, 'margin-left')
    // const [marginRight, setMarginRight] = useGetValue(target, 'margin-right')
    return (
        <div className="attribute">
            <div className='attribute-title'>边距</div>
            <div className="attribute-content">
                {/* <StyleInput title='MT' value={marginTop} changeValue={setMarginTop} tip={''} />
                <StyleInput title='MB' value={marginBottom} changeValue={setMarginBottom} tip={''} />
                <StyleInput title='ML' value={marginLeft} changeValue={setMarginLeft}  tip={''}/>
                <StyleInput title='MR' value={marginRight} changeValue={setMarginRight}  tip={''}/> */}
            </div>

        </div>
    )
}
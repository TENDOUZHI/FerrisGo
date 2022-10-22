import { Ingredients } from '@/components/molecules/Ingredients'
import { Structure } from '@/components/molecules/Structure'
import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'
interface Props {
    program_id: number
}
export const LeftList = (props: Props) => {
    const [ingredients, setIngredients] = useState<boolean>(true)
    const [structure, setStructure] = useState<boolean>(false)

    const struRef = useRef<any>(null)
    const ingreRef = useRef<any>(null)
    
    

    const toIngredients = () => {
        setIngredients(true)
        setStructure(false)
        
        ingreRef.current.style.color = '#ededed'
        struRef.current.style.color = '#b5b5b5'
        
    }
    const toStructure = () => {
        setIngredients(false)
        setStructure(true)
        
        ingreRef.current.style.color = '#b5b5b5'
        struRef.current.style.color = '#ededed'
    }
    return (
        <div className="leftlist-wrapper">
            <ul className="list-bar">
                <li className="structure" onClick={toStructure} ref={struRef}>页面结构</li>
                <li className="ingredients" onClick={toIngredients} ref={ingreRef}>组件</li>
            </ul>
            <div className="content-wrapper">
                {ingredients && <Ingredients />}
                {structure && <Structure program_id={props.program_id} />}

            </div>
        </div>
    )
}
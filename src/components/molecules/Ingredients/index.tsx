import { View } from '@/components/atoms/View'
import { Text } from '@/components/atoms/Text'
import './index.scss'
import { Button } from '@/components/atoms/Button'
export const Ingredients = () => {
    return(
        <div className='ingredients'>
            <div className="ingredients-wrapper">
               <View/> 
               <span className="name">view</span>
            </div>
            <div className="ingredients-wrapper">
            <Text/>
               <span className="name">text</span>
            </div>
            <div className="ingredients-wrapper">
            <Button/>
               <span className="name">button</span>
            </div>
            
        </div>
    )
}
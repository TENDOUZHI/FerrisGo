import { View } from '@/components/atoms/View'
import { Text } from '@/components/atoms/Text'
import './index.scss'
import { Button } from '@/components/atoms/Button'
import { Swiper } from '@/components/atoms/Swiper'
import { Form } from '@/components/atoms/Form'
import { Collapse } from '../Collapse'
import { useDispatch } from 'react-redux'
export const Ingredients = () => {
    const dispatch = useDispatch()
    return (
        <div className='ingredients'>
            {/* @ts-ignore */}
            <Collapse title='视图容器' dispatch={dispatch}>
                <View />
                <Text />
                <Swiper />
            </Collapse>
            {/* @ts-ignore */}
            <Collapse title='表单组件' dispatch={dispatch}>
                <Button />
                <Form />
            </Collapse>

        </div>
    )
}
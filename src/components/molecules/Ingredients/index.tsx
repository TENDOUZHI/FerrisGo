import { View } from '@/components/quark/View'
import { Text } from '@/components/quark/Text'
import './index.scss'
import { Button } from '@/components/quark/Button'
import { Swiper } from '@/components/quark/Swiper'
import { Form } from '@/components/quark/Form'
import { Image } from '@/components/quark/Image'
import { Collapse } from '../Collapse'
import { useDispatch } from 'react-redux'
import { Icon } from '@/components/quark/Icon'
export const Ingredients = () => {
    const dispatch = useDispatch()
    return (
        <div className='ingredients'>
            {/* @ts-ignore */}
            <Collapse title='视图容器' dispatch={dispatch}>
                <View />
                <Swiper />
                <Image/>
            </Collapse>
            {/* @ts-ignore */}
            <Collapse title='基础内容' dispatch={dispatch}>
                <Text />
                <Icon/>
            </Collapse>
            {/* @ts-ignore */}
            <Collapse title='表单组件' dispatch={dispatch}>
                <Button />
                <Form />
            </Collapse>

        </div>
    )
}
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
import { useLayoutEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api'
import { VNode } from '@/store/ast'
import { CusEl } from '@/components/atoms/CusEl'

export interface cusEl {
    id: number,
    name: string,
    vnode: VNode
}

export const Ingredients = () => {
    const dispatch = useDispatch()
    const [cusEl, setCusEl] = useState<cusEl[]>()
    useLayoutEffect(() => {
        invoke('show_encapsulate_element').then(res => {
            console.log(res);
            setCusEl(res as cusEl[])
        })
    }, [])
    return (
        <div className='ingredients'>
            <Collapse title='自定义组件' dispatch={dispatch} num={1}>
                {
                    cusEl?.map(item => <CusEl key={item.id} title={item.name} id={item.id} />)
                }
            </Collapse>
            <Collapse title='视图容器' dispatch={dispatch} num={3}>
                <View />
                <Swiper />
                <Image />
            </Collapse>
            <Collapse title='基础内容' dispatch={dispatch} num={2}>
                <Text />
                <Icon />
            </Collapse>
            <Collapse title='表单组件' dispatch={dispatch} num={2}>
                <Button />
                <Form />
            </Collapse>

        </div>
    )
}
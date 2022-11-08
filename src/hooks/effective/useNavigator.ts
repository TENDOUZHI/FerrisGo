import { selectTabBar } from "@/store/source.slice"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export const useNavigator = (props: string): [string, (value: string) => void] => {
    const [attr, setAttr] = useState<string>('')
    const tabBar = useSelector(selectTabBar)
    useEffect(() => {
        if (tabBar !== null) {
            setAttr(getComputedStyle(tabBar).getPropertyValue(props))
        }
    }, [tabBar])

    const setValue = (value: string) => {
        let camel: string | any = ''
        if (tabBar !== null) {
            if (props.includes('-')) {
                for (let i = 0; i < props.length; i++) {
                    if (props[i] === '-') {
                        camel = props.substring(0, i) + props[i + 1].toUpperCase() + props.substring(i + 2, props.length)
                    }
                }
            } else {
                camel = props
            }
            tabBar.style[camel] = value
        }
    }

    return [attr, setValue]

}
import { navigatorSliceAction, selectNav, selectTabBar } from "@/store/navigator.slice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

type props = 'color' | 'selectedColor' | 'borderColor'

export const useNavigator = (props: props): [string, (value: string) => void] => {
    const dispatch = useDispatch()
    const navigator = useSelector(selectNav)
    const [attr, setAttr] = useState<string>('')
    const tabBar = useSelector(selectTabBar)
    useEffect(() => {
        if (tabBar !== null) {
            switch (props) {
                case 'color':
                    setAttr(navigator.fontColor)
                    break;
                case 'borderColor':
                    setAttr(navigator.borderColor)
                    break;
                case 'selectedColor':
                    setAttr(navigator.selectedColor)
                default:
                    break;
            }
        }
    }, [tabBar])

    const setValue = (value: string) => {
        let camel: string | any = ''
        if (tabBar !== null) {
            tabBar.style[camel] = value
            switch (props) {
                case 'color':
                    dispatch(navigatorSliceAction.updateColor(value))
                    break;
                case 'selectedColor':
                    dispatch(navigatorSliceAction.updateSelectedColor(value))
                    break;

                default:
                    break;
            }
        }
    }

    return [attr, setValue]

}
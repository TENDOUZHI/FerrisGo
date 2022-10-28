import { Swiper, VNode, Vprops } from "@/store/ast"
import { selectDevice } from "@/store/device.slice"
import { selectRoot } from "@/store/source.slice"
import { selectSwiper, swiperSliceAction, SwiperType } from "@/store/swiper.slice"
import { selectTarget } from "@/store/target.slice"
import { selectUser } from "@/store/user.slice"
import { routesSliceAction, selectCurRoutes, selectProgramId, selectRoutes, selectVapp } from "@/store/vapp.slice"
import { selectWs } from "@/store/ws.slice"
import { Dispatch } from "@reduxjs/toolkit"
import { useEffect, useLayoutEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useCompile } from "../useCompile"
import { useRenderer } from "../useRenderer"
import { useUpdate } from "../useUpdate"
import { useVprops } from "../useVprops"


export const useSetCheckBox = (rootValue: SwiperType, dispatch: Dispatch): [boolean, (value: boolean) => void] => {
    const [value, setValue] = useState<boolean>(false)
    let target = useSelector(selectTarget) as HTMLElement
    const vprops = useVprops()
    const swiper = vprops.swiper as Swiper
    const preUpdate = useUpdate()
    useEffect(() => {
        setValue(swiper[rootValue])
    }, [target])
    // syn data to vnode and rerender root
    const setValues = (value: boolean) => {
        switch (rootValue) {
            case 'auto_play':
                dispatch(swiperSliceAction.setAutoPlay(value))
                break;
            case 'pagination':
                dispatch(swiperSliceAction.setPagination(value))
                break;
            case 'scrollbar':
                dispatch(swiperSliceAction.setScrollBar(value))
                break;
            default:
                break;
        }
        preUpdate()
    }

    return [value, setValues]
}
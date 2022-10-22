import { selectDevice } from "@/store/device.slice"
import { useSelector } from "react-redux"

export const useRpx = (px:number, deviceWidth: number): number => {
    let rpx = (750 / deviceWidth)*px
    return Math.floor(rpx)
}
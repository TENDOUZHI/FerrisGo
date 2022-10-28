import { Vprops } from "@/store/ast"
import { selectIcon } from "@/store/icon.slice"
import { selectImage } from "@/store/image.slice"
import { selectSwiper } from "@/store/swiper.slice"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const useVprops = () => {
    const swiper = useSelector(selectSwiper)
    const image = useSelector(selectImage)
    const icon = useSelector(selectIcon)
    let vprops = {
        swiper: swiper,
        img: image,
        icon: icon
    }
    useEffect(() => {
        vprops = {
            swiper: swiper,
            img: image,
            icon: icon
        }
    }, [swiper, image, icon])
    return vprops
}
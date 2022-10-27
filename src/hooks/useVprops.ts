import { Vprops } from "@/store/ast"
import { selectImage } from "@/store/image.slice"
import { selectSwiper } from "@/store/swiper.slice"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const useVprops = () => {
    const swiper = useSelector(selectSwiper)
    const image = useSelector(selectImage)
    let vprops = {
        swiper: swiper,
        img: image
    }
    useEffect(() => {
        vprops = {
            swiper: swiper,
            img: image
        }
    }, [swiper,image])
    return vprops
}
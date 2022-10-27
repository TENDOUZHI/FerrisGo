import { Vprops } from "@/store/ast"
import { selectSwiper } from "@/store/swiper.slice"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const useVprops = () => {
    const swiper = useSelector(selectSwiper)
    const image = {
        src: ''
    }
    // const [vprops, setVprops] = useState<Vprops>({
    //     swiper: swiper,
    //     img: image
    // })
    let vprops = {
        swiper: swiper,
        img: image
    }
    useEffect(() => {
        // setVprops({
        //     swiper: swiper,
        //     img: image
        // })
        vprops = {
            swiper: swiper,
            img: image
        }
    }, [swiper])
    return vprops
}
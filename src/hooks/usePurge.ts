import { useState } from "react"

export const usePurge = (container: HTMLElement, arrow: HTMLElement, height: number) => {
    const [purge, setPurge] = useState<boolean>(false)
    const purgeContainer = () => {
        console.log(container);
        container.style.height = height + 'px'
        setTimeout(() => {
            if (!purge) {
                container.style.height = '0px'
                arrow.style.transform = 'rotate(-90deg)'
                setPurge(true)
            } else {
                container.style.height = height + 'px'
                arrow.style.transform = 'rotate(0deg)'
                setPurge(false)
            }
        })
    }
    return purgeContainer
}
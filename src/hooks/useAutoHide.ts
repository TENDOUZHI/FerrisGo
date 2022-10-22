import { useState } from "react"

export const useAutoHide = (
    dom: HTMLElement,
    parents: HTMLElement,
    showClass: string
): (() => void) => {
    const [show, setShow] = useState<boolean>(false)
    const switchOption = () => {
        if (!show) {
            try {
                dom.style.display = 'block'
                setTimeout(() => {
                    dom.classList.add(showClass)
                })
                setShow(true)
                setTimeout(() => {
                    document.addEventListener('click', autoHide)
                });
            } catch (error) { }
        }
    }
    const autoHide = (e: MouseEvent) => {
        const set = new Set()
        try {
            dom.childNodes.forEach((v) => {
                set.add(v)
            })
        } catch (error) {}

        set.add(parents)
        if (
            //     (
            //     e.target !== parents ||
            //     e.target !== dom.childNodes[0] ||
            //     e.target !== dom.childNodes[1]
            // )
            !set.has(e.target)
        ) {
            try {
                dom.style.display = 'none'
                dom.classList.remove(showClass)
                setShow(false)
                document.removeEventListener('click', autoHide)
            } catch (error) {

            }

        }
    }
    return switchOption
}
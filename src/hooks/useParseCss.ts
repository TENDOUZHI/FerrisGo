import { Style } from "@/store/ast"
import { useRpx } from "./useRpx"

export const useParseCss = (el: HTMLElement, width: number | null, isRpx: boolean): Style => {
    const style: Style = {
        width: window.getComputedStyle(el).width,
        height: window.getComputedStyle(el).height,
        font_size: window.getComputedStyle(el).fontSize,
        color: window.getComputedStyle(el).color,
        margin_top: window.getComputedStyle(el).marginTop,
        margin_bottom: window.getComputedStyle(el).marginBottom,
        margin_left: window.getComputedStyle(el).marginLeft,
        margin_right: window.getComputedStyle(el).marginRight,
        padding_top: window.getComputedStyle(el).paddingTop,
        padding_bottom: window.getComputedStyle(el).paddingBottom,
        padding_left: window.getComputedStyle(el).paddingLeft,
        padding_right: window.getComputedStyle(el).paddingRight,
        border_radius: window.getComputedStyle(el).borderRadius,
        border: getComputedStyle(el).border,
        border_width: window.getComputedStyle(el).borderWidth,
        border_color: window.getComputedStyle(el).borderColor,
        background_color: window.getComputedStyle(el).backgroundColor,
        opacity: window.getComputedStyle(el).opacity,
        display: window.getComputedStyle(el).display,
        flex_direction: window.getComputedStyle(el).flexDirection,
        justify_content: window.getComputedStyle(el).justifyContent,
        justify_items: window.getComputedStyle(el).justifyItems,
        align_content: window.getComputedStyle(el).alignContent,
        align_items: window.getComputedStyle(el).alignItems,
    }
    if (isRpx) {
        for (let key in style) {
            // @ts-ignore
            const value: string = style[key]
            let tail = value[value.length - 2] + value[value.length - 1]
            if (tail === 'px') {
                const px = Number(value.substring(0, value.length - 2))
                const rpx = useRpx(px, width as number)
                const value_rpx = rpx.toString() + 'rpx'
                // @ts-ignore
                style[key] = value_rpx
            }
        }
    }

    return style
}
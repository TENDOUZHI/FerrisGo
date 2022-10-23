import { useHashCode } from "./useHashCode"

export type nodeName = 'view' | 'text' | 'button' | 'swipper'

export const useCreateCom = (nodeName: nodeName, node: HTMLElement) => {
    switch (nodeName) {
        case 'view':
            node.draggable = false
            node.style.width = '100%'
            node.style.height = '50px'
            node.style.backgroundColor = '#fff'
            const className = useHashCode(nodeName)
            node.classList.add(className)
            break;

        default:
            break;
    }
}
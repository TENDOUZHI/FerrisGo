export const useScroll = (
    target: HTMLElement,
    scrollTop: number,
    start: number,
    limit: number,
    left: number,
    top: number,
    hwRate: number,
    right?: number,
    bottom?: number,
) => {
    if(scrollTop >= start && scrollTop <= limit) {
        target.style.left = Math.floor(scrollTop-start-left) + 'px'
        target.style.top = Math.floor(scrollTop-start-top) * hwRate + 'px'
        console.log(scrollTop-start-top-top);
        
    }
}
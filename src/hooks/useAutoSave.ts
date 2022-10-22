import { Vapp } from "@/store/ast";

export const useAutoSave = (vapp: Vapp, wapp: Vapp, size?: number) => {
    localStorage.setItem('vapp', JSON.stringify(vapp))
    localStorage.setItem('wapp', JSON.stringify(wapp))
    if(size !== undefined) {
        localStorage.setItem('size', JSON.stringify(size))
    }
}
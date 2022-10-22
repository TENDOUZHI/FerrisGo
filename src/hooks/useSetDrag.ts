import { sourceSliceAction } from "@/store/source.slice";
import { DragEvent } from "react";
import { useDispatch } from "react-redux";

export const useSetDrag = (e: DragEvent) => {
        const dispatch = useDispatch()
        e.preventDefault()
        dispatch(sourceSliceAction.captureSource(e.target))
}
import { useRef, useCallback } from "react";
import { useNotesStore } from "../store/useNotes";

export function useDrag(id: string, noteRef: React.RefObject<HTMLDivElement | null>) {
    const isDragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });
    const position = useRef({ x: 0, y: 0 });

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        const note = useNotesStore.getState().notes[id];
        if (!note) return;
        isDragging.current = true;
        offset.current = {
            x: e.clientX - note.position.x,
            y: e.clientY - note.position.y,
        };

        position.current = { ...note.position };

        e.currentTarget.setPointerCapture(e.pointerId);
    }, [id]);


    return {
        onPointerDown,

    };
}
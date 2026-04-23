import { useRef, useCallback } from "react";
import { useNotesStore } from "../store/useNotes";
import { STICKY_NOTE_MIN_HEIGHT, STICKY_NOTE_MIN_WIDTH } from "../constants/stickyNotes.constants";

export function useResize(
    id: string,
    noteRef: React.RefObject<HTMLDivElement | null>
) {
    const note = useNotesStore((s) => s.notes[id]);
    const updateNote = useNotesStore((s) => s.updateNote);

    const resizing = useRef(false);
    const start = useRef({ x: 0, y: 0, w: 0, h: 0 });

    const onStartResizeNote = useCallback((e: React.PointerEvent) => {
        if (!note) return;
        console.log('start resizing')
        resizing.current = true;
        start.current = {
            x: e.clientX,
            y: e.clientY,
            w: note?.size?.width ?? STICKY_NOTE_MIN_WIDTH,
            h: note?.size?.height ?? STICKY_NOTE_MIN_HEIGHT,
        };

        e.currentTarget.setPointerCapture(e.pointerId);
        e.stopPropagation();
    }, [note]);



    return { onStartResizeNote };
}
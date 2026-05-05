import { useRef, useCallback } from "react";
import { useNotesStore } from "../store/useNotes";
import type {
    StickyNotePosition,
    StickyNoteSize,
} from "../interfaces/StickyNote";

/**
 * Custom hook to handle the drag and drop logic of a Note.
 * @param id - The unique ID of the Note.
 * @param noteRef - Reference to the Note DOM element.
 * @param trashRef - Reference to the Trash DOM element (to detect collision).
 * @param boardRef - Reference to the Board DOM element (to enforce boundaries).
 */
export function useCreate(
    boardRef: React.RefObject<HTMLDivElement | null>,
) {

    const isDragging = useRef(false);

    const createNote = useNotesStore((s) => s.createNote);


    const dropPosition = useRef<StickyNotePosition>({ x: 0, y: 0 });
    const initialPosition = useRef<StickyNotePosition>({ x: 0, y: 0 });
    const noteSize = useRef<StickyNoteSize>({ width: 0, height: 0 });


    /**
     * Executed on pressing the drag handler (Start dragging the Note).
     */
    const onDragCreate = useCallback(
        (e: React.PointerEvent) => {
            initialPosition.current = { x: e.clientX, y: e.clientY }
            // console.log("initial", initialPosition)
            e.currentTarget.setPointerCapture(e.pointerId);
        },
        [boardRef],
    );


    /**
     * Executed on releasing the mouse after dragging (Dropping the Note).
     */
    const onDropCreate = useCallback(
        (e: React.PointerEvent) => {
            dropPosition.current = { x: e.clientX, y: e.clientY }
            console.log("initial and drop", initialPosition, dropPosition)

            const width = Math.abs(initialPosition.current.x - dropPosition.current.x)
            const height = Math.abs(initialPosition.current.y - dropPosition.current.y)

            console.log(width, height)

            const { x: initialX, y: initialY } = initialPosition.current

            createNote({ x: initialX, y: initialY }, { width: width, height: height })


            if (!isDragging.current) return;
            e.currentTarget.releasePointerCapture(e.pointerId);
        },
        [],
    );

    return {
        onDragCreate,
        onDropCreate,
    };
}

import { useCallback, useRef, memo } from "react";
import { useShallow } from "zustand/react/shallow";
import StickyNote from "../StickyNote/StickyNote";
import { useNotesStore } from "../../store/useNotes";
import { createStickyNote } from "../../utils/stickyNotes.utils";
import { Trash2 } from "lucide-react";
import { BoardProvider } from "../../context/BoardProvider";
import DeleteNoteModal from "../DeleteNoteModal/DeleteNoteModal";
import "./Board.css";

const Board = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  const trashRef = useRef<HTMLDivElement>(null);
  const addNote = useNotesStore((state) => state.addNote);

  /**
  / Create a new note on doubleClicking in an empty space on the board
  */
  const handleAddNote = useCallback(
    (e: React.MouseEvent) => {
      if (e.target !== e.currentTarget) return;
      const rect = boardRef.current?.getBoundingClientRect();
      const x = e.clientX - (rect?.left || 0);
      const y = e.clientY - (rect?.top || 0);

      const { lastZIndex } = useNotesStore.getState();
      const newStickyNote = createStickyNote({ x, y }, lastZIndex + 1);
      addNote(newStickyNote);
    },
    [addNote],
  );

  return (
    <BoardProvider trashRef={trashRef}>
      <section className="board" ref={boardRef} onDoubleClick={handleAddNote}>
        <div className="trash-item" ref={trashRef}>
          <Trash2 size={60} />
        </div>
        <NotesList />
      </section>
      <DeleteNoteModal />
    </BoardProvider>
  );
};
export default Board;

const NotesList = memo(() => {
  const notes = useNotesStore(useShallow((s) => s.notes));
  return (
    <>
      {notes.map((note) => (
        <StickyNote key={note.id} id={note.id} />
      ))}
    </>
  );
});

import { useEffect, useState, useCallback } from "react";
import { useNotesStore } from "../../store/useNotes";
import "./UndoToast.css";
import type { StickyNote } from "../../interfaces/StickyNote";

interface ToastItemProps {
  note: StickyNote;
  onClose: (id: string) => void;
  onRestore: (id: string) => void;
}

const ToastItem = ({ note, onClose, onRestore }: ToastItemProps) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(note.id);
    }, 300);
  }, [onClose, note.id]);

  const handleRestore = () => {
    onRestore(note.id);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [handleClose]);

  return (
    <div className={`undo-toast ${isExiting ? "exit" : ""}`}>
      <span>Note deleted</span>
      <div className="undo-toast-actions">
        <button
          onClick={handleRestore}
          className="undo-toast-btn"
          style={{ background: note.backgroundColor }}
        >
          Undo
        </button>
        <button onClick={handleClose} className="undo-toast-close">
          &times;
        </button>
      </div>
    </div>
  );
};

export const UndoToast = () => {
  const deletedNotes = useNotesStore((s) => s.deletedNotes);
  const restoreNote = useNotesStore((s) => s.restoreNote);
  const clearDeletedNote = useNotesStore((s) => s.clearDeletedNote);

  const deletedNotesList = Object.values(deletedNotes);

  if (deletedNotesList.length === 0) return null;

  return (
    <div className="undo-toast-container">
      {deletedNotesList.map((note) => (
        <ToastItem
          key={note.id}
          note={note}
          onClose={clearDeletedNote}
          onRestore={restoreNote}
        />
      ))}
    </div>
  );
};

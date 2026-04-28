import { useEffect } from "react";
import { useNotesStore } from "../../store/useNotes";
import "./UndoToast.css";

export const UndoToast = () => {
  const lastDeletedNote = useNotesStore((s) => s.lastDeletedNote);
  const restoreNote = useNotesStore((s) => s.restoreNote);
  const clearDeletedNote = useNotesStore((s) => s.clearDeletedNote);

  useEffect(() => {
    if (lastDeletedNote) {
      const timer = setTimeout(() => {
        clearDeletedNote();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [lastDeletedNote, clearDeletedNote]);

  if (!lastDeletedNote) return null;

  return (
    <div className="undo-toast">
      <span>Note deleted</span>
      <button onClick={restoreNote} className="undo-toast-btn">
        Undo
      </button>
      <button onClick={clearDeletedNote} className="undo-toast-close">
        &times;
      </button>
    </div>
  );
};

import { useState, type RefObject } from "react";
import { BoardContext } from "./boardContext";

interface BoardProviderProps {
  children: React.ReactNode;
  trashRef: RefObject<HTMLDivElement | null>;
}

export function BoardProvider({ children, trashRef }: BoardProviderProps) {
  const [pendingDeleteNoteId, setPendingDeleteNoteId] = useState<string | null>(null);

  const openDeleteModal = (id: string) => {
    setPendingDeleteNoteId(id);
  };

  const closeDeleteModal = () => {
    setPendingDeleteNoteId(null);
  };

  return (
    <BoardContext.Provider value={{ trashRef, pendingDeleteNoteId, openDeleteModal, closeDeleteModal }}>
      {children}
    </BoardContext.Provider>
  );
}

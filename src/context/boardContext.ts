import { createContext, type RefObject } from "react";

export type BoardContextType = {
  trashRef: RefObject<HTMLDivElement | null>;
  pendingDeleteNoteId: string | null;
  openDeleteModal: (id: string) => void;
  closeDeleteModal: () => void;
};

export const BoardContext = createContext<BoardContextType | null>(null);

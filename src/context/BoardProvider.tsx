import type { RefObject } from "react";
import { BoardContext } from "./boardContext";

export function BoardProvider({
  children,
  trashRef,
}: {
  children: React.ReactNode;
  trashRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <BoardContext.Provider value={{ trashRef }}>
      {children}
    </BoardContext.Provider>
  );
}

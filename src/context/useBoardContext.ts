import { use } from "react";
import { BoardContext } from "./boardContext";

export function useBoardContext() {
  const context = use(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
}

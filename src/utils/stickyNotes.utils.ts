import type {
  StickyNote,
  StickyNotePosition,
  StickyNoteSize,
} from "../interfaces/StickyNote";
import type { Element as SlateElement } from "slate";

export const generateColor = (): string => {
  const color = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");

  return `#${color}`;
};

export const createStickyNote = (
  size: StickyNoteSize,
  position: StickyNotePosition,
  zIndex: number,
): StickyNote => {
  return {
    id: crypto.randomUUID(),
    backgroundColor: generateColor(),
    textContent: [
      {
        type: "paragraph",
        children: [{ text: "" }],
      } as SlateElement,
    ],
    position,
    size,
    zIndex,
  };
};

import type {
  StickyNote,
  StickyNotePosition,
  StickyNoteSize,
} from "../interfaces/StickyNote";

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
    textContent: "",
    position,
    size,
    zIndex,
  };
};

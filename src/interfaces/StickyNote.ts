import type { Descendant } from "slate";

export type StickyNoteTextContent = string | Descendant[];

export interface StickyNote {
  id: string;
  textContent: StickyNoteTextContent;
  backgroundColor: string;
  position: StickyNotePosition;
  size?: StickyNoteSize;
  zIndex: number;
}

export interface StickyNotePosition {
  x: number;
  y: number;
}

export interface StickyNoteSize {
  width: number;
  height: number;
}

export interface StickyNoteRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

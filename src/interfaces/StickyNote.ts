export interface StickyNote {
    id: string;
    textContent: string;
    position: StickyNotePosition
    backgroundColor: string;
}

export interface StickyNotePosition {
    x: number;
    y: number;
}
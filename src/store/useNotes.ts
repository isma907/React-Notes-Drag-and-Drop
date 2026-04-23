import { devtools, persist } from "zustand/middleware";
import type { StickyNote } from "../interfaces/StickyNote";
import { create } from "zustand";

type NotesState = {
    notes: Record<string, StickyNote>;
    addNote: (note: StickyNote) => void;
    removeNote: (id: string) => void;
    updateNote: (id: string, updates: Partial<StickyNote>) => void;
};


export const useNotesStore = create<NotesState>()(
    devtools(
        persist(
            (set) => ({
                notes: {},
                addNote: (note) =>
                    set(
                        (state) => ({
                            notes: {
                                ...state.notes,
                                [note.id]: note,
                            },
                        }),
                        false,
                        "[Note] addNote",
                    ),
                removeNote: (id) =>
                    set(
                        (state) => {
                            const { [id]: _, ...rest } = state.notes;
                            return { notes: rest };
                        },
                        false,
                        "[Note] removeNote",
                    ),
                updateNote: (id, updates) =>
                    set(
                        (state) => ({
                            notes: {
                                ...state.notes,
                                [id]: { ...state.notes[id], ...updates },
                            },
                        }),
                        false,
                        "[Note] updateNote",
                    ),

            }),
            { name: "sticky-notes" }, // saved in localstorage to persist data
        ),
    ),
);

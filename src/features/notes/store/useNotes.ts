// store/useNotes.ts
import { create } from "zustand";
import type Note from "@/features/notes/types/Note";

interface NoteState {
  notes: Note[];
  fetchNotes: () => Promise<void>;
}

export const useNotes = create<NoteState>((set) => ({
  notes: [],
  fetchNotes: async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    set({ notes: data.notes });
  },
}));
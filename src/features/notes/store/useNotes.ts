// store/useNotes.ts
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type Note from "@/features/notes/types/Note";

interface NoteState {
  notes: Note[];
  fetchNotes: () => Promise<void>;
}

interface NoteNoId {
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

export const useNotes = create<NoteState>((set) => ({
  notes: [],
  fetchNotes: async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    
    const notesWithId = data.notes.map((note: NoteNoId) => ({
      id: uuidv4(),
      ...note,
    }));

    set({ notes: notesWithId });
  },
}));
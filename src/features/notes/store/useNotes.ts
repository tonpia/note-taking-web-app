// store/useNotes.ts
"use client";

import { create } from "zustand";
import type Note from "@/features/notes/types/Note";
import { notesService } from "../services/notesService";

interface NoteState {
  notes: Note[];
  fetchNotes: () => Promise<Note[]>;
  fetchNote: (id: string) => Promise<Note>;
  addNote: (newNote: Omit<Note, "id">) => Promise<Note>;
  editNote: (id: string, updatedData: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

export const useNotes = create<NoteState>((set, get) => ({
  notes: [],

  // --- FETCH ALL NOTES --- //
  fetchNotes: async () => {
    const prevNotes = get().notes;
    const newNotes = await notesService.getAll();
    if (JSON.stringify(prevNotes) !== JSON.stringify(newNotes)) {
      set({ notes: newNotes });
    }
    return newNotes;
  },

  // --- FETCH ONE NOTE --- //
  fetchNote: async (id) => {
    const note = await notesService.getOne(id);
    return note;
  },

  // --- ADD NOTE --- //
  addNote: async (newNote) => {
    const created = await notesService.create(newNote as Note);
    set({ notes: [...get().notes, created] });
    return created;
  },

  // --- EDIT NOTE --- //
  editNote: async (id, updatedData) => {
    const prevNotes = get().notes;

    // Optimistic update first
    set({
      notes: prevNotes.map((note) =>
        note.id === id
          ? { ...note, ...updatedData, lastEdited: new Date().toISOString() }
          : note
      ),
    });

    try {
      await notesService.update(id, updatedData);
    } catch (error) {
      console.error("Failed to edit note:", error);
      set({ notes: prevNotes });
    }
  },

  // --- DELETE NOTE --- //
  deleteNote: async (id) => {
    const prevNotes = get().notes;

    // Optimistic remove
    set({ notes: prevNotes.filter((n) => n.id !== id) });

    try {
      await notesService.delete(id);
    } catch (error) {
      console.error("Failed to delete note:", error);
      set({ notes: prevNotes });
    }
  },
}));

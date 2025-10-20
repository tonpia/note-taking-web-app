// store/useNotes.ts
"use client";

import { create } from "zustand";
import type Note from "@/features/notes/types/Note";

interface NoteState {
  notes: Note[];
  fetchNotes: () => Promise<void>;
  addNote: (newNote: Omit<Note, "id">) => Promise<Note>;
  editNote: (id: string, updatedData: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

interface NoteNoId {
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

async function handleJson<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} - ${text}`);
  }
  return res.json();
}

export const useNotes = create<NoteState>((set, get) => ({
  notes: [],

  // --- FETCH ALL NOTES --- //
  fetchNotes: async () => {
    try {
      const data = await handleJson<{ notes: (Note & Partial<NoteNoId>)[] }>(
        "/api/notes"
      );
      // Expect API to provide IDs already
      set({ notes: data.notes });
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      set({ notes: [] });
    }
  },

  // --- ADD NOTE --- //
  addNote: async (newNote) => {
    try {
      const created = await handleJson<Note>("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      }); // Optimistic update (append to existing)
      set({ notes: [...get().notes, created] });

      return created;
    } catch (error) {
      console.error("Failed to add note:", error);
      throw error;
    }
  },

  // --- EDIT NOTE --- //
  editNote: async (id, updatedData) => {
    // Optimistic update first
    const prevNotes = get().notes;
    set({
      notes: prevNotes.map((note) =>
        note.id === id
          ? { ...note, ...updatedData, lastEdited: new Date().toISOString() }
          : note
      ),
    });

    try {
      await handleJson(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
    } catch (error) {
      console.error("Failed to edit note:", error);
      // Roll back on failure
      set({ notes: prevNotes });
    }
  },

  // --- DELETE NOTE --- //
  deleteNote: async (id) => {
    const prevNotes = get().notes;
    // Optimistic remove
    set({ notes: prevNotes.filter((n) => n.id !== id) });

    try {
      await handleJson(`/api/notes/${id}`, { method: "DELETE" });
    } catch (error) {
      console.error("Failed to delete note:", error);
      // Rollback if delete fails
      set({ notes: prevNotes });
    }
  },
}));

"use client";

import { useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useNotes } from "@/features/notes/store/useNotes";
import NotesList from "@/features/notes/components/NotesList";
import AddNoteButton from "@/features/notes/components/AddNoteButton";

export default function NotesPage() {
  const router = useRouter();
  const { notes, fetchNotes, addNote } = useNotes();

  // --- Load notes once on mount --- //
  useEffect(() => {
    if (notes.length === 0) {
      fetchNotes().catch((err) => console.error("Failed to load notes:", err));
    }
  }, [notes.length, fetchNotes]);

  const nonArchivedNotes = useMemo(
    () => notes.filter((note) => !note.isArchived),
    [notes]
  );

  // --- Create a new note and navigate to it --- //
  const handleAddNote = useCallback(async () => {
    try {
      const now = new Date().toISOString();
      const newNote = {
        id: uuidv4(),
        title: "Untitled Note",
        tags: [],
        content: "",
        lastEdited: now,
        isArchived: false,
      };

      const created = await addNote(newNote);
      if (created?.id) {
        router.push(`/notes/${created.id}`);
      }
    } catch (err) {
      console.error("Failed to create new note:", err);
    }
  }, [addNote, router]);

  if (notes.length === 0) {
    return (
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">All Notes</h1>
        <div className="rounded-md bg-neutral-100 dark:bg-neutral-800">
          <p className="text-center mt-10 text-gray-500 dark:text-white">
            {`You don't have any notes yet. Start a new note to capture your
            thoughts and ideas.`}
          </p>
        </div>

        <AddNoteButton onClick={handleAddNote} />
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">All Notes</h1>
        <AddNoteButton onClick={handleAddNote} />
      </header>

      <NotesList notes={nonArchivedNotes} />
    </main>
  );
}

"use client";

import { useEffect } from "react";
import { useNotes } from "@/features/notes/store/useNotes";
import NotesList from "@/features/notes/components/NotesList";

export default function NotesPage() {
  const { notes, fetchNotes } = useNotes();

  useEffect(() => {
    if (notes.length === 0) {
      fetchNotes();
    }
  }, [notes.length, fetchNotes]);

  return (
    <>
      {/* ────────────────────────────── */}
      {/* Notes Content */}
      {/* ────────────────────────────── */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">All Notes</h1>

        {notes.length === 0 ? (
          <div className="rounded-md bg-neutral-100 ">
            <p className="text-gray-500 text-center mt-10">
              {`You don't have any notes yet. Start a new note to capture your
              thoughts and ideas.`}
            </p>
          </div>
        ) : (
          <NotesList notes={notes} />
        )}
      </main>
    </>
  );
}

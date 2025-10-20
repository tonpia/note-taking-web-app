"use client";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useNotes } from "@/features/notes/store/useNotes";
import NotesList from "@/features/notes/components/NotesList";

export default function NotesPage() {
  const router = useRouter();
  const { notes, fetchNotes, addNote, editNote, deleteNote } = useNotes();

  // Load notes on first render
  useEffect(() => {
    if (notes.length === 0) {
      fetchNotes();
    }
  }, [notes.length, fetchNotes]);

  // Create and open new note
  const handleAddNote = async () => {
    const now = new Date().toISOString();
    const newNoteData = {
      id: uuidv4(),
      title: "Untitled Note",
      tags: [],
      content: "",
      lastEdited: now,
      isArchived: false,
    };

    try {
      const created = await addNote(newNoteData);
      if (!created) return;
      router.push(`/notes/${created.id}`);
    } catch (error) {
      console.error("Failed to create new note:", error);
    }
  };

  return (
    <>
      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">All Notes</h1>
        {notes.length === 0 ? (
          <div className="rounded-md bg-neutral-100 dark:bg-neutral-800">
            <p className="text-center mt-10 text-gray-500 dark:text-white">
              {`You don't have any notes yet. Start a new note to capture your thoughts and ideas.`}
            </p>
          </div>
        ) : (
          <NotesList notes={notes} />
        )}
      </main>

      {/* Floating Add Button */}
      <button
        onClick={handleAddNote}
        aria-label="Add new note"
        className="bottom-6 left-6 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 flex items-center justify-center transition-colors"
      >
        {/* Plus icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </>
  );
}

"use client";

import { useEffect, useMemo} from "react";
import { useRouter } from "next/navigation";
import { useNotes } from "@/features/notes/store/useNotes";
import NotesList from "@/features/notes/components/NotesList";

export default function ArchivedNotesPage() {
  const router = useRouter();
  const { notes, fetchNotes } = useNotes();

  /** Load notes once on mount */
  useEffect(() => {
    if (notes.length === 0) {
      fetchNotes().catch((err) => console.error("Failed to load notes:", err));
    }
  }, [notes.length, fetchNotes]);

  /** Filter archived notes only */
  const archivedNotes = useMemo(
    () => notes.filter((note) => note.isArchived),
    [notes]
  );

  return (
    <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Archived Notes</h1>
      </header>

      {archivedNotes.length === 0 ? (
        <div className="rounded-md bg-neutral-100 dark:bg-neutral-800">
          <p className="text-center mt-10 text-gray-500 dark:text-white">
            {`You don't have any archived notes yet.`}
          </p>
        </div>
      ) : (
        <NotesList notes={archivedNotes} />
      )}
    </main>
  );
}

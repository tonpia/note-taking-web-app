"use client";

import { useEffect } from "react";
import { useNotes } from "@/features/notes/store/useNotes";
import type Note from "@/features/notes/types/Note";
import NavButton from "@/features/notes/components/NavButton";
import TopBanner from "@/features/notes/components/TopBanner";
import BottomNav from "@/features/notes/components/BottomNav";

export default function NotesPage() {
  const { notes, fetchNotes } = useNotes();

  useEffect(() => {
    if (notes.length === 0) {
      fetchNotes();
    }
  }, [notes.length, fetchNotes]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* ────────────────────────────── */}
      {/* Banner (Sticky Top) */}
      {/* ────────────────────────────── */}
      <TopBanner></TopBanner>
      {/* ────────────────────────────── */}
      {/* Notes Content */}
      {/* ────────────────────────────── */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">All Notes</h1>

        {notes.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No notes yet.</p>
        ) : (
          <ul className="space-y-4 divide-y divide-gray-200 dark:divide-gray-700">
            {notes.map((note: Note, index: number) => (
              <li
                key={index}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                tabIndex={0}
                role="button"
                aria-label={`Open note: ${note.title}`}
              >
                <h2 className="text-lg font-medium mb-1">{note.title}</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  {note.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(note.lastEdited).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* ────────────────────────────── */}
      {/* Bottom Navigation Bar (Sticky Bottom) */}
      {/* ────────────────────────────── */}
      <BottomNav></BottomNav>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useNotes } from "@/features/notes/store/useNotes";
import type Note from "@/features/notes/types/Note";
import Image from "next/image";

export default function NotePage() {
  const params = useParams();
  const id = params?.id as string; // from /notes/[id]
  const { notes, fetchNotes } = useNotes();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    // try to find note locally first
    const existing = notes.find((n) => n.id === id);
    if (existing) {
      setNote(existing);
      return;
    }

    // If not in store, fetch all notes (for demo simplicity)
    const load = async () => {
      await fetchNotes();
    };
    load();
  }, [id, notes, fetchNotes]);

  // Update local state when store updates (after fetch finishes)
  useEffect(() => {
    const newNote = notes.find((n) => n.id === id);
    if (newNote) setNote(newNote);
  }, [notes, id]);

  // Loading or not found UI
  if (!note) {
    return <p className="text-gray-500 text-center mt-10">Loading note...</p>;
  }

  return (
    <article className="p-6">
      <h1 className="text-2xl font-bold mb-4">{note.title}</h1>

      {/* Tags Section */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Image
          src="/assets/images/icon-tag.svg"
          alt="Tag icon"
          width={20}
          height={20}
        />
        <p className="text-sm text-gray-500">Tags:</p>
        <div className="flex flex-wrap gap-2 pl-4">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Last Edited Section */}
      <div className="flex items-center gap-2 mb-6">
        <Image
          src="/assets/images/icon-clock.svg"
          alt="Clock icon"
          width={20}
          height={20}
        />
        <p className="text-sm text-gray-500">
          <span className="mr-2">Last edited:</span>
          <span className="pl-4">
            {new Date(note.lastEdited).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </p>
      </div>

      {/* Content */}
      <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
        {note.content}
      </p>
    </article>
  );
}

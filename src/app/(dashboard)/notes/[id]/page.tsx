"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useNotes } from "@/features/notes/store/useNotes";
import type Note from "@/features/notes/types/Note";

export default function NotePage() {
  const params = useParams();
  const id = params?.id as string;

  const { notes, fetchNotes, addNote, editNote, deleteNote } = useNotes();

  const [note, setNote] = useState<Note | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Local content for editing
  const [content, setContent] = useState("");

  // --- Load note --- //
  useEffect(() => {
    if (!id) return; // <-- block until id exists

    const existing = notes.find((n) => n.id === id);
    if (existing) {
      setNote(existing);
      setContent(existing.content);
      return;
    }
    fetchNotes();
  }, [id, notes, fetchNotes]);

  // --- Sync after store updates (e.g., after fetch) --- //
  useEffect(() => {
    const updated = notes.find((n) => n.id === id);
    if (updated) {
      setNote(updated);
      setContent(updated.content);
    }
  }, [notes, id]);

  // --- Autosave Effect (Debounced) --- //
  useEffect(() => {
    if (!note) return;
    const timer = setTimeout(async () => {
      if (content !== note.content) {
        setIsSaving(true);
        await editNote(note.id, { content });
        setIsSaving(false);
      }
    }, 600); // Debounce delay (ms)

    return () => clearTimeout(timer);
  }, [content, note, editNote]);

  // --- Loading / Not Found UI --- //
  if (!note)
    return (
      <p className="text-gray-500 text-center mt-10">
        {`This note doesn't exist or is loading...`}
      </p>
    );

  // --- UI --- //
  return (
    <article className="p-6">
      <header className="mb-4">
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

        {/* Last Edited & Saving Indicator */}
        <div className="flex items-center gap-2 mb-6">
          <Image
            src="/assets/images/icon-clock.svg"
            alt="Clock icon"
            width={20}
            height={20}
          />
          <p className="text-sm text-gray-500 flex items-center">
            <span className="mr-2">Last edited:</span>
            <span className="pl-4">
              {new Date(note.lastEdited).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            {isSaving && (
              <span className="ml-4 text-blue-500 animate-pulse">
                Saving...
              </span>
            )}
          </p>
        </div>
      </header>

      {/* Editable Content Area */}
      <textarea
        className="w-full min-h-[60vh] resize-none p-4 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing your note..."
      />
    </article>
  );
}

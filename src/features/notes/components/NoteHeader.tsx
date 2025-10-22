"use client";

import Image from "next/image";
import type Note from "../types/Note";

interface NoteHeaderProps {
  title: string;
  setTitle: (v: string) => void;
  note: Note;
  isSaving: boolean;
}

export function NoteHeader({
  title,
  setTitle,
  note,
  isSaving,
}: NoteHeaderProps) {
  return (
    <header>
      {/* Editable Title */}
      <textarea
        className="w-full text-2xl font-bold mb-4 resize-none border-none focus:outline-none focus:ring-0
             bg-transparent h-auto overflow-hidden text-gray-900 dark:text-gray-100
             whitespace-pre-wrap break-words"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        rows={1}
        placeholder="Untitled note"
      />

      {/* Tags */}
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
              className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Last Edited + Saving Indicator */}
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
            <span className="ml-4 text-blue-500 animate-pulse">Saving...</span>
          )}
        </p>
      </div>
    </header>
  );
}

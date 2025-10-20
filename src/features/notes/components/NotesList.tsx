// features/notes/components/NotesList.tsx

import Link from "next/link";
import type Note from "@/features/notes/types/Note";

type NotesListProps = {
  notes: Note[];
};

export default function NotesList({ notes }: NotesListProps) {
  return (
    <ul className="space-y-4 divide-y divide-gray-200 dark:divide-gray-700">
      {notes.map((note) => (
        <li key={note.id}>
          <Link
            href={`/notes/${note.id}`}
            className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-800 
                       transition-colors cursor-pointer focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 rounded"
            aria-label={`Open note: ${note.title}`}
          >
            <h2 className="text-lg font-medium mb-1">{note.title}</h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {Array.isArray(note.tags) &&
                note.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs bg-gray-200 dark:bg-gray-700 
                           text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
            </div>
            <p className="text-sm text-gray-500">
              {note.lastEdited
                ? new Date(note.lastEdited).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

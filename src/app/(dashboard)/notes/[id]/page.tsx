"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useNotes } from "@/features/notes/store/useNotes";
import type Note from "@/features/notes/types/Note";
import { NoteActionBar } from "@/features/notes/components/NoteActionBar";
import { NoteHeader } from "@/features/notes/components/NoteHeader";
import { NoteEditor } from "@/features/notes/components/NoteEditor";
import { useAutoSaveNote } from "@/features/notes/hooks/useAutoSaveNote";

export default function NotePage() {
  const { id } = useParams<{ id: string }>();
  const { notes, fetchNotes, editNote } = useNotes();

  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const n = notes.find((n) => n.id === id);
    if (n) {
      setNote(n);
      setTitle(n.title);
      setContent(n.content);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      fetchNotes().finally(() => setIsLoading(false));
    }
  }, [id, notes, fetchNotes]);

  const { isSaving } = useAutoSaveNote({
    note,
    title,
    content,
    editNote,
  });

  if (isLoading)
    return <p className="text-gray-500 text-center mt-10">Loading note...</p>;
  if (!note)
    return <p className="text-gray-500 text-center mt-10">Note not found.</p>;

  return (
    <article className="p-6">
      <NoteActionBar
        onGoBack={() => history.back()}
        onDelete={() => console.log("delete note")}
        onArchive={() => console.log("archive note")}
        onCancel={() => console.log("cancel edits")}
        onSave={() => editNote(note.id, { title, content })}
      />
      <div className="flex-grow h-px mb-4 bg-gray-300 dark:bg-neutral-700" />
      <NoteHeader
        title={title}
        setTitle={setTitle}
        note={note}
        isSaving={isSaving}
      />
      <div className="flex-grow h-px mb-4 bg-gray-300 dark:bg-neutral-700" />
      <NoteEditor content={content} setContent={setContent} />
    </article>
  );
}

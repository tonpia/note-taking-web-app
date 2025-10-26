"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useNotes } from "@/features/notes/store/useNotes";
import type Note from "@/features/notes/types/Note";
import { NoteActionBar } from "@/features/notes/components/NoteActionBar";
import { NoteHeader } from "@/features/notes/components/NoteHeader";
import { NoteEditor } from "@/features/notes/components/NoteEditor";
import { ActionConfirmation } from "@/features/notes/components/ActionConfirmation";
import { useAutoSaveNote } from "@/features/notes/hooks/useAutoSaveNote";

export default function NotePage() {
  const { id } = useParams<{ id: string }>();
  const { notes, fetchNotes, editNote, deleteNote } = useNotes();

  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!id) return;
      const n = notes.find((n) => n.id === id);
      if (n) {
        if (!active) return;
        setNote(n);
        setTitle(n.title);
        setContent(n.content);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        await fetchNotes();
        if (!active) return;
        setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id, notes, fetchNotes]);

  const { isSaving } = useAutoSaveNote({
    note,
    title,
    content,
    editNote,
  });

  const handleDelete = async () => {
    if (!note) return;
    await deleteNote(note.id);
    setNote(null);
    setShowDeleteConfirm(false);
    history.back();
  };

  const handleArchive = async () => {
    if (!note) return;
    await editNote(note.id, { ...note, isArchived: true }); // Mark as archived
    setShowArchiveConfirm(false);
    history.back(); // Optional: go back after archiving
  };

  if (isLoading)
    return (
      <p className="flex-grow text-gray-500 text-center mt-10">
        Loading note...
      </p>
    );
  if (!note)
    return (
      <p className="flex-grow text-gray-500 text-center mt-10">
        Note not found.
      </p>
    );

  return (
    <section className="p-6">
      <NoteActionBar
        onGoBack={() => history.back()}
        onDelete={() => setShowDeleteConfirm(true)}
        onArchive={() => setShowArchiveConfirm(true)}
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
      <ActionConfirmation
        visible={showDeleteConfirm}
        title="Delete Note"
        label="Are you sure you want to permanently delete this note? This action cannot be undone."
        iconSrc="/assets/images/icon-delete.svg"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
      <ActionConfirmation
        visible={showArchiveConfirm}
        title="Archive Note"
        label="Do you want to move this note to your archived list? You can restore it later."
        iconSrc="/assets/images/icon-archive.svg" // Provide an appropriate archive icon
        onConfirm={handleArchive}
        onCancel={() => setShowArchiveConfirm(false)}
      />
    </section>
  );
}

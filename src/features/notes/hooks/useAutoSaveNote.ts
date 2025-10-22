import { useEffect, useRef, useState } from "react";
import type Note from "../types/Note";

interface UseAutoSaveNoteParams {
  note: Note | null;
  title: string;
  content: string;
  editNote: (id: string, data: Partial<Note>) => Promise<void>;
  delay?: number;
}

export function useAutoSaveNote({
  note,
  title,
  content,
  editNote,
  delay = 600,
}: UseAutoSaveNoteParams) {
  const [isSaving, setIsSaving] = useState(false);
  const latestSaveRef = useRef(0);

  useEffect(() => {
    if (!note) return;
    if (title === note.title && content === note.content) return;

    const timer = setTimeout(async () => {
      latestSaveRef.current++;
      const currentVersion = latestSaveRef.current;

      setIsSaving(true);
      await editNote(note.id, { title, content });
      if (latestSaveRef.current === currentVersion) setIsSaving(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [note, title, content, editNote, delay]);

  return { isSaving };
}

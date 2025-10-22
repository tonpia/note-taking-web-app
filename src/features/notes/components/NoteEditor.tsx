"use client";

interface NoteEditorProps {
  content: string;
  setContent: (v: string) => void;
}

export function NoteEditor({ content, setContent }: NoteEditorProps) {
  return (
    <textarea
      className="w-full min-h-[60vh] resize-none border-none focus:outline-none focus:ring-0 bg-transparent text-gray-800 dark:text-gray-200"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder="Start writing your note..."
    />
  );
}

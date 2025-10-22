"use client";

import Image from "next/image";

interface NoteActionBarProps {
  onGoBack?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}

export function NoteActionBar({
  onGoBack,
  onDelete,
  onArchive,
  onCancel,
  onSave,
}: NoteActionBarProps) {
  return (
    <div className="flex flex-row mb-4 justify-between items-center">
      {/* Left side: Go Back */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onGoBack}
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <Image
            width={20}
            height={20}
            src="/assets/images/icon-arrow-left.svg"
            alt="Go Back Icon"
          />
          <span>Go Back</span>
        </button>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center space-x-2">
        <button onClick={onDelete}>
          <Image
            width={20}
            height={20}
            src="/assets/images/icon-delete.svg"
            alt="Delete Icon"
          />
        </button>
        <button onClick={onArchive}>
          <Image
            width={20}
            height={20}
            src="/assets/images/icon-archive.svg"
            alt="Archive Icon"
          />
        </button>
        <button
          className="text-sm text-gray-600 hover:text-gray-900"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="text-blue-600 text-sm font-medium hover:underline"
          onClick={onSave}
        >
          Save Note
        </button>
      </div>
    </div>
  );
}

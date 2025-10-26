// components/ActionConfirmation.tsx
"use client";
import Image from "next/image";

interface ActionConfirmationProps {
  visible: boolean;
  title: string;
  label: string;
  iconSrc?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ActionConfirmation({
  visible,
  title,
  label,
  iconSrc,
  onConfirm,
  onCancel,
}: ActionConfirmationProps) {
  if (!visible) return null; // hides modal when not used

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg w-[90%] max-w-md p-6">
        {/* Header Section: Icon + Text side by side */}
        <div className="flex items-start text-left space-x-4">
          {iconSrc && (
            <div className="flex-shrink-0">
              <Image
                src={iconSrc}
                alt={title}
                width={60}
                height={60}
                className="rounded-md"
              />
            </div>
          )}

          {/* Text block */}
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {label}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mt-4 mb-4 bg-gray-300 dark:bg-neutral-700" />

        {/* Buttons (same as before) */}
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-neutral-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            {title}
          </button>
        </div>
      </div>
    </div>
  );
}

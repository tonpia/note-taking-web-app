export default function AddNoteButton({
  onClick,
}: {
  onClick: () => void | Promise<void>;
}) {
  return (
    <button
      onClick={onClick}
      aria-label="Add new note"
      className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 
                 dark:bg-blue-500 dark:hover:bg-blue-400 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="w-10 h-10"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
}

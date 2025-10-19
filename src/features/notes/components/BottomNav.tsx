import NavButton from "./NavButton";

export default function BottomNav() {
  return (
    <nav
      aria-label="Bottom Navigation"
      className="sticky bottom-0 z-10 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
    >
      <ul className="flex justify-around items-center py-3">
        <NavButton
          src="/assets/images/icon-home.svg"
          alt="Home"
          label="Home"
          href="/notes"
        />
        <NavButton
          src="/assets/images/icon-search.svg"
          alt="Search"
          label="Search"
          href="/search"
        />
        <NavButton
          src="/assets/images/icon-archive.svg"
          alt="New Note"
          label="New Note"
          href="/notes/archived"
        />
        <NavButton
          src="/assets/images/icon-tag.svg"
          alt="Tags"
          label="Tags"
          href="/notes/tags"
        />
        <NavButton
          src="/assets/images/icon-settings.svg"
          alt="Settings"
          label="Settings"
          href="/settings"
        />
      </ul>
    </nav>
  );
}

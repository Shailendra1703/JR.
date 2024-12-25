import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 max-w-7xl mx-auto">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 dark:text-white"
        >
          JR.
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="https://github.com/shailendra1703/JR."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-800 text-white dark:bg-gray-700 rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            ★ Star on GitHub
          </a>
        </div>
      </div>
    </header>
  );
}

"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <div className="text-5xl">&#x26A0;&#xFE0F;</div>
          <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
          <p className="text-zinc-400">
            An unexpected error occurred. Please try again or return to the homepage.
          </p>
          {error.digest && (
            <p className="text-xs text-zinc-600 font-mono">Error ID: {error.digest}</p>
          )}
          <div className="flex gap-3 justify-center">
            <button
              onClick={reset}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-500 transition-colors"
            >
              Try again
            </button>
            <a
              href="/"
              className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-zinc-500 transition-colors"
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

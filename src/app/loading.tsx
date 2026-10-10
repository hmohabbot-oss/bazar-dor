export default function Loading() {
  return (
    <main
      className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950"
      aria-busy="true"
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
    >
      <span className="sr-only" role="status">পণ্যের তথ্য লোড হচ্ছে</span>
      <header className="border-b border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-32 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            </div>
          </div>
          <div className="h-9 w-28 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
        </div>
        <div className="mx-auto mt-4 flex max-w-7xl gap-3 overflow-hidden border-t border-zinc-100 pt-3 dark:border-zinc-800">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="h-8 w-20 shrink-0 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800"
            />
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-14 animate-pulse rounded-xl bg-emerald-50 dark:bg-zinc-900" />
        <div className="h-56 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900 sm:h-64" />
        <section aria-hidden="true">
          <div className="mb-5 h-7 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="h-56 animate-pulse rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

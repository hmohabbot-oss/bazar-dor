import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 text-center">
      <span className="text-6xl mb-4 block">🛒</span>
      <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-2">৪০৪</h1>
      <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-4">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h2>
      <p className="text-sm text-zinc-500 max-w-sm mb-8">
        আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা মুছে ফেলা হয়েছে।
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
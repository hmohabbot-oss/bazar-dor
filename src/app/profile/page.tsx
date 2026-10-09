"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 dark:bg-zinc-900/50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-12 flex-1 w-full">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
            আমার প্রোফাইল
          </h1>

          <div className="space-y-4 mb-8">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
              <span className="text-xs text-zinc-500 block">নাম</span>
              <span className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
                {session?.user.name || "—"}
              </span>
            </div>

            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
              <span className="text-xs text-zinc-500 block">ইমেইল</span>
              <span className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
                {session?.user.email || "—"}
              </span>
            </div>
          </div>

          <Link
            href="/profile/update"
            className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition"
          >
            তথ্য পরিবর্তন করুন (Update Information)
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
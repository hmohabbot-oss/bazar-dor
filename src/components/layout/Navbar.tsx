"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import type { Category } from "@/types";
import { fallbackCategories, mergeCategories } from "@/lib/category-display";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);

  useEffect(() => {
    let ignore = false;
    fetch("https://api.abcz.workers.dev/api/bazardor/categories")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: Category[]) => {
        if (!ignore && Array.isArray(data) && data.length) {
          setCategories(mergeCategories(data));
        }
      })
      .catch(() => undefined);
    return () => {
      ignore = true;
    };
  }, []);

  // আজকের বাংলা তারিখ ফরম্যাট
  const todayBn = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const handleSignOut = async () => {
    await signOut();
    toast.success("লগআউট সফল হয়েছে");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur dark:bg-zinc-950/95 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* টপ রো: লোগো ও অথেনটিকেশন বাটন */}
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={36}
              height={36}
              priority
              className="object-contain"
            />
            <div>
              <span className="font-bold text-xl text-emerald-600 dark:text-emerald-400">
                বাজার দর
              </span>
              <p className="text-xs text-zinc-500">{todayBn}</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-emerald-600"
                >
                  প্রোফাইল ({session.user.name})
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-xs bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 px-3 py-1.5 rounded-lg font-medium transition"
                >
                  লগআউট
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="text-sm px-3.5 py-1.5 rounded-lg font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="text-sm px-3.5 py-1.5 rounded-lg font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* বটম রো: ক্যাটাগরি মেনু */}
        <nav className="flex items-center gap-2 overflow-x-auto py-2 border-t border-zinc-100 dark:border-zinc-900 no-scrollbar">
          {[{ slug: "all", nameBn: "সব পণ্য", icon: "🧺" }, ...categories].map((cat) => {
            const path = cat.slug === "all" ? "/" : `/category/${cat.slug}`;
            const isActive = pathname === path;
            return (
              <Link
                key={cat.slug}
                href={path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

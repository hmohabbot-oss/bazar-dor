"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types";
import { sortProducts } from "@/lib/utils";
import type { Category } from "@/types";
import { fallbackCategories, categoryName } from "@/lib/category-display";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const category = categories.find((item) => item.slug === slug);
  const categoryInfo = category ? categoryName(category) : undefined;

  useEffect(() => {
    let ignore = false;
    fetch("https://api.api-store.workers.dev/api/bazardor/categories")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: Category[]) => {
        if (!ignore && Array.isArray(data) && data.length) setCategories(data);
      })
      .catch(() => undefined);
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      if (!categoryInfo) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`
        );
        if (res.ok) {
          const data = await res.json();
          if (!ignore) setProducts(data);
        } else {
          if (!ignore) setProducts([]);
        }
      } catch {
        if (!ignore) setProducts([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadData();
    return () => {
      ignore = true;
    };
  }, [slug, Boolean(categoryInfo)]);

  // সর্ট করা প্রোডাক্ট তালিকা (C1 Challenge)
  const displayedProducts = sortProducts(products, sortOption);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 dark:bg-zinc-900/50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {/* ইনভ্যালিড ক্যাটাগরি বা এম্পটি স্টেট */}
        {!categoryInfo ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
            <span className="text-5xl mb-4 block">🔍</span>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              ক্যাটাগরি পাওয়া যায়নি
            </h2>
            <p className="text-zinc-500 mb-6">
              আপনার খোঁজা ক্যাটাগরিটি বিদ্যমান নেই।
            </p>
            <Link
              href="/"
              className="inline-flex px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <>
            {/* হেডার ও সর্ট কন্ট্রোল */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-2 bg-emerald-100 dark:bg-emerald-950/50 rounded-2xl">
                  {categoryInfo.icon}
                </span>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                    {categoryInfo.name}
                  </h1>
                  <p className="text-sm text-zinc-500">
                    দৈনিক বাজার দরের তালিকা
                  </p>
                </div>
              </div>

              {/* C1: সর্ট ড্রপডাউন */}
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 shadow-sm">
                <label
                  htmlFor="sort"
                  className="text-xs sm:text-sm font-medium text-zinc-500 whitespace-nowrap"
                >
                  সাজান:
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer"
                >
                  <option value="default">ডিফল্ট</option>
                  <option value="low-to-high">দাম: কম থেকে বেশি</option>
                  <option value="high-to-low">দাম: বেশি থেকে কম</option>
                </select>
              </div>
            </div>

            {/* লোডিং স্কেলিটন বা প্রোডাক্ট গ্রিড */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="h-56 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-500 text-lg mb-4">
                  এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
                </p>
                <Link
                  href="/"
                  className="inline-flex px-5 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition"
                >
                  হোম পেজে ফিরে যান
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

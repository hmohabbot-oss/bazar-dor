import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProductById } from "@/lib/api";
import { toBnNumber, getUnitBn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // বিভিন্ন বাজার থেকে সর্বনিম্ন, সর্বোচ্চ এবং গড় দাম হিসাব
  const allMins = product.markets?.map((m) => m.min) || [product.today];
  const allMaxs = product.markets?.map((m) => m.max) || [product.today];
  const minPrice = Math.min(...allMins);
  const maxPrice = Math.max(...allMaxs);
  const avgPrice = Math.round((minPrice + maxPrice) / 2);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 dark:bg-zinc-900/50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-emerald-600 hover:underline"
        >
          ← সব পণ্যে ফিরে যান
        </Link>

        {/* Top Summary */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="text-6xl p-5 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center">
            {product.image}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-full text-xs font-semibold">
                {product.categoryNameBn}
              </span>
              <span className="px-3 py-1 bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 rounded-full text-xs">
                {getUnitBn(product.unit)}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">
              {product.nameBn}
            </h1>
            <p className="text-sm text-zinc-500">
              দৈনিক বাজার পর্যবেক্ষণের ভিত্তিতে সংগৃহীত পাইকারি ও খুচরা দর
            </p>
          </div>

          <div className="text-center sm:text-right bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
            <span className="text-xs text-zinc-500 block">আজকের বাজার দর</span>
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {toBnNumber(product.today)} টাকা
            </span>
            <span className="text-xs text-zinc-500 block mt-1">{getUnitBn(product.unit)}</span>
          </div>
        </div>

        {/* Price Summary (সর্বনিম্ন, সর্বোচ্চ, গড়) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 text-center">
            <span className="text-xs font-medium text-zinc-500 block mb-1">সর্বনিম্ন দর</span>
            <span className="text-2xl font-bold text-emerald-600">
              {toBnNumber(minPrice)} টাকা
            </span>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 text-center">
            <span className="text-xs font-medium text-zinc-500 block mb-1">গড় দর</span>
            <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
              {toBnNumber(avgPrice)} টাকা
            </span>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 text-center">
            <span className="text-xs font-medium text-zinc-500 block mb-1">সর্বোচ্চ দর</span>
            <span className="text-2xl font-bold text-rose-600">
              {toBnNumber(maxPrice)} টাকা
            </span>
          </div>
        </div>

        {/* বাজারভিত্তিক আজকের দাম */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              বাজারভিত্তিক আজকের দাম
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-xs text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">বাজারের নাম</th>
                  <th className="px-6 py-3.5 font-semibold">বিভাগ</th>
                  <th className="px-6 py-3.5 font-semibold text-right">সর্বনিম্ন দর</th>
                  <th className="px-6 py-3.5 font-semibold text-right">সর্বোচ্চ দর</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {product.markets?.map((m, index) => (
                  <tr key={index} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30">
                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                      {m.market}
                    </td>
                    <td className="px-6 py-4 text-zinc-500">{m.division}</td>
                    <td className="px-6 py-4 text-right font-semibold text-emerald-600">
                      {toBnNumber(m.min)} টাকা
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-rose-600">
                      {toBnNumber(m.max)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
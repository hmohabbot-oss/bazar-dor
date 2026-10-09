import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-emerald-50/60 to-transparent dark:from-zinc-900/50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-full text-xs font-semibold mb-4">
              দৈনিক বাজার দর পর্যবেক্ষণ
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white leading-tight mb-4">
              নিত্যপ্রয়োজনীয় পণ্যের বাজার দর জানুন এক ক্লিকেই
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 mb-8">
              আজকের বাজারের সবজির দর, চাল, ডাল, তেল ও মাছের নির্ভরযোগ্য ও হালনাগাদ তথ্য। সঠিক দামে পণ্য কিনুন, সতর্ক থাকুন।
            </p>
            <a
              href="#সব-পণ্য"
              className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all"
            >
              সব পণ্য দেখুন ↓
            </a>
          </div>

          <div className="flex justify-center">
            <Image
              src="/bazar-hero.png"
              alt="বাজার দর ব্যানার"
              width={520}
              height={420}
              priority
              className="w-full max-w-md lg:max-w-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
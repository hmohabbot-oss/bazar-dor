import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/layout/PriceTicker";
import Hero from "@/components/home/Hero";
import ProductCard from "@/components/product/ProductCard";
import Footer from "@/components/layout/Footer";
import { getAllProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getAllProducts();

  // সেকশন A: আজ দাম বেড়েছে (Top 6 risers)
  const priceRisers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // সেকশন B: আজ দাম কমেছে (Top 6 fallers)
  const priceFallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <main className="min-h-screen flex flex-col bg-zinc-50/50 dark:bg-zinc-900/50">
      <Navbar />
      <PriceTicker products={products} />
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 flex-1">
        {/* Section A: আজ দাম বেড়েছে */}
        {priceRisers.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl text-rose-600">▲</span>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                আজ দাম বেড়েছে
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {priceRisers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section B: আজ দাম কমেছে */}
        {priceFallers.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl text-emerald-600">▼</span>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                আজ দাম কমেছে
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {priceFallers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section C: সব পণ্য */}
        <section id="সব-পণ্য" className="scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              সব পণ্য
            </h2>
            <p className="text-sm text-zinc-500">
              দৈনিক বাজারের সকল পণ্যের তালিকা
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

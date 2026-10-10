import Link from 'next/link';
import { Product } from '@/types';
import { toBnNumber, getUnitBn } from '@/lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.change.dir === 'up';
  const isDown = product.change.dir === 'down';

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 transition-all hover:shadow-lg hover:border-emerald-500"
    >
      <div className="text-4xl mb-3 flex items-center justify-center h-16 w-16 bg-zinc-50 dark:bg-zinc-800 rounded-xl group-hover:scale-110 transition-transform">
        {product.image}
      </div>

      <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">{product.nameBn}</h3>
      <p className="text-sm text-zinc-500 mb-4">{getUnitBn(product.unit)}</p>

      <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3">
        <div>
          <span className="text-xs text-zinc-400 block">আজকের দাম</span>
          <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {toBnNumber(product.today)} টাকা
          </span>
        </div>

        <span
          className={`text-xs font-semibold px-2 py-1 rounded-md ${
            isUp
              ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/30'
              : isDown
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30'
              : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'
          }`}
        >
          {isUp ? '▲' : isDown ? '▼' : '—'} {toBnNumber(product.change.pct)}%
        </span>
      </div>
    </Link>
  );
}

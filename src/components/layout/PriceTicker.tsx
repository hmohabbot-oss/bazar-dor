import { Product } from '@/types';
import { toBnNumber, getUnitBn } from '@/lib/utils';

export default function PriceTicker({ products }: { products: Product[] }) {
  return (
    <div className="bg-emerald-50 dark:bg-zinc-900 border-y border-emerald-100 dark:border-zinc-800 overflow-hidden py-2 whitespace-nowrap">
      <div className="inline-flex animate-marquee gap-8 items-center">
        {products.concat(products).map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="inline-flex items-center gap-2 text-sm">
            <span>{item.image}</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">{item.nameBn}</span>
            <span className="text-zinc-600 dark:text-zinc-400">
              {toBnNumber(item.today)} টাকা/{getUnitBn(item.unit).replace('প্রতি ', '')}
            </span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded font-bold ${
                item.change.dir === 'up'
                  ? 'bg-emerald-100 text-emerald-600'
                  : item.change.dir === 'down'
                  ? 'bg-rose-100 text-rose-600'
                  : 'bg-zinc-100 text-zinc-500'
              }`}
            >
              {item.change.dir === 'up' ? '▲' : item.change.dir === 'down' ? '▼' : '—'} {toBnNumber(item.change.pct)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Product, Category } from '@/types';

const BASE_URL = 'https://api.abcz.workers.dev/api/bazardor';

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('পণ্য ফেচ করা যায়নি');
  return res.json();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?category=${category}`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return res.json();
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, { next: { revalidate: 60 } });
    if (res.ok) return res.json();
  } catch {
    // Fall back to the collection endpoint if the single-product route is unavailable.
  }

  try {
    const products = await getAllProducts();
    return products.find((product) => String(product.id) === id) ?? null;
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('ক্যাটাগরি ফেচ করা যায়নি');
  return res.json();
}

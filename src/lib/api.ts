import { Product, Category } from '@/types';

const BASE_URL = 'https://api.abz.workers.dev/api/bazardor';

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
  const res = await fetch(`${BASE_URL}/products/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('ক্যাটাগরি ফেচ করা যায়নি');
  return res.json();
}

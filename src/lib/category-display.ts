import type { Category } from "@/types";

/** Known categories shown when the categories API is temporarily unavailable. */
export const fallbackCategories: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍖" },
  { id: "moshla", slug: "moshla", nameBn: "মসলা", icon: "🌶️" },
];

export function categoryName(category: Category) {
  return { name: category.nameBn, icon: category.icon };
}

export function mergeCategories(apiCategories: Category[]): Category[] {
  const remaining = [...apiCategories];
  const known = fallbackCategories.map((fallback) => {
    const index = remaining.findIndex(
      (category) =>
        category.slug === fallback.slug || category.nameBn === fallback.nameBn,
    );
    if (index < 0) return fallback;
    const [apiCategory] = remaining.splice(index, 1);
    return { ...fallback, ...apiCategory };
  });

  return [...known, ...remaining];
}

import { Product } from '@/types';

// ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর
export const toBnNumber = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/[0-9]/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

// ইউনিটের বাংলা অনুবাদ
export const getUnitBn = (unit: string): string => {
  const unitMap: Record<string, string> = {
    kg: 'প্রতি কেজি',
    liter: 'প্রতি লিটার',
    dozen: 'প্রতি ডজন',
    piece: 'প্রতি পিস',
    hali: 'প্রতি হালি',
  };
  return unitMap[unit] || `প্রতি ${unit}`;
};

// C1: সর্টিং ফাংশন (সংখ্যাগত মান অনুযায়ী সর্ট হবে)
export const sortProducts = (products: Product[], sortType: string): Product[] => {
  const sorted = [...products];
  if (sortType === 'low-to-high') {
    return sorted.sort((a, b) => a.today - b.today);
  }
  if (sortType === 'high-to-low') {
    return sorted.sort((a, b) => b.today - a.today);
  }
  return sorted;
};
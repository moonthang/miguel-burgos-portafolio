import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const monthMap: Record<string, Record<string, number>> = {
  es: { 'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5, 'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11 },
  en: { 'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5, 'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11 },
};

export const parseDate = (dateString: string, lang: 'es' | 'en', t: (key: string, options?: any) => string) => {
  const translatedDate = t(dateString, { lng: lang });
  if (!translatedDate) return new Date(0);

  const parts = translatedDate.toLowerCase().replace('.', '').split(' ');
  if (parts.length < 2) return new Date(0);

  const monthStr = parts[0].substring(0, 3);
  const month = monthMap[lang]?.[monthStr];
  const year = parseInt(parts[parts.length - 1], 10);

  if (month !== undefined && !isNaN(year)) {
    return new Date(year, month);
  }
  return new Date(0);
};

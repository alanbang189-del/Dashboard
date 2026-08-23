import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(number: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

export function formatCompactRupiah(number: number) {
  if (number >= 1000000000) {
    return `Rp ${(number / 1000000000).toFixed(1).replace('.', ',')} M`;
  }
  if (number >= 1000000) {
    return `Rp ${(number / 1000000).toFixed(1).replace('.', ',')} Jt`;
  }
  return formatRupiah(number);
}

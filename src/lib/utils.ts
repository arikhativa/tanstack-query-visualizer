import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TQueryKeys } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toStringTQueryKeys(keys: TQueryKeys): string {
  const ret = keys
    .map((key) => {
      if (key === undefined) {
        return "";
      }
      if (typeof key === "string" || typeof key === "number") {
        return String(key);
      }
      if (typeof key === "object" && key !== null) {
        return JSON.stringify(key);
      }
      return "";
    })
    .filter(Boolean)
    .join(", ");

  return `[${ret}]`;
}

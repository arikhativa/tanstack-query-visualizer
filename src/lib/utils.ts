import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TQueryKeys } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toStringTQueryKeys(keys: TQueryKeys): string {
  const ret = keys.map((key) => stringifyKeyPart(key)).join(", ");

  return `[${ret}]`;
}

function stringifyKeyPart(value: unknown): string {
  if (value === undefined) return "undefined";
  if (value === null) return "null";

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  if (value instanceof Date) {
    return `Date(${value.toISOString()})`;
  }

  // arrays & objects
  try {
    return JSON.stringify(value);
  } catch {
    return "[Unserializable]";
  }
}

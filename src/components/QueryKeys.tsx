import type { QueryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  list: QueryItem["queryKey"];
  className?: string;
}

function stringifyKeyPart(value: unknown): string {
  if (value === undefined) return "undefined";
  if (value === null) return "null";

  if (typeof value === "string") {
    return `'${value}'`;
  }

  if (typeof value === "number" || typeof value === "boolean") {
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

function toStringTQueryKeys(list: QueryItem["queryKey"]): string {
  const ret = list.map((key) => stringifyKeyPart(key)).join(", ");

  return `[${ret}]`;
}

export function QueryKeys({ list, className }: Props) {
  return (
    <div className={cn("flex justify-start items-center", className)}>
      {toStringTQueryKeys(list)}
    </div>
  );
}

import type { UseQueryResult } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect, useRef, useState, type JSX } from "react";
import { cn, toStringTQueryKeys } from "@/lib/utils";
import { Separator } from "./ui/separator";
import type { TQueryKeys } from "@/lib/types";

interface Props<T> {
  query: UseQueryResult<T, Error>;
  keys: TQueryKeys;
  label: string;
  comp: (props: T) => JSX.Element;
  className?: string;
}

export function DataCard<T>({ className, keys, label, comp, query }: Props<T>) {
  const dataUpdatedAt = useRef(0);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (dataUpdatedAt.current !== query.dataUpdatedAt) {
      setHighlight(true);
      const t = setTimeout(() => setHighlight(false), 800);
      return () => clearTimeout(t);
    }
    dataUpdatedAt.current = query.dataUpdatedAt;
  }, [query.dataUpdatedAt]);

  if (query.data) {
    return (
      <Card
        className={cn(
          "transition-colors duration-200",
          highlight && "bg-primary/10",
          className
        )}
      >
        <CardHeader>
          <CardTitle>{label}</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1">{comp(query.data)}</CardContent>
        <CardFooter>{toStringTQueryKeys(keys)}</CardFooter>
      </Card>
    );
  }
}

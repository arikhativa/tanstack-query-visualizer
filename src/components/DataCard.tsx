import type { UseQueryResult } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { useEffect, useRef, useState, type JSX } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

interface Props<T> {
  query: UseQueryResult<T, Error>;
  keys: readonly string[];
  label: string;
  comp: (props: T) => JSX.Element;
}

export function DataCard<T>({ keys, label, comp, query }: Props<T>) {
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
          highlight && "bg-primary/10"
        )}
      >
        <CardHeader>
          <p>keys:</p>
          <p>[{keys.join(", ")}]</p>
        </CardHeader>
        <Separator />
        <CardContent>
          <Label>{label}</Label>
          {comp(query.data)}
        </CardContent>
      </Card>
    );
  }
}

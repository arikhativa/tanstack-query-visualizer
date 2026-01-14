import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { cn, toStringTQueryKeys } from "@/lib/utils";
import type { QueryItem } from "@/lib/types";

import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { Separator } from "../ui/separator";

interface Props {
  queryItem: QueryItem;
  className?: string;
}

export function QueryCard({
  className,
  queryItem: { queryKey, label },
}: Props) {
  const query = useQuery({ queryKey });

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

  return (
    <Item
      variant={"outline"}
      className={cn(
        "transition-colors duration-200",
        highlight && "bg-primary/10",
        className
      )}
    >
      <ItemContent className="flex gap-2 flex-row">
        <ItemTitle>{label}</ItemTitle>
        <Separator orientation={"vertical"} />
        <div className="flex-1">{toStringTQueryKeys(queryKey)}</div>
      </ItemContent>
    </Item>
  );
}

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { QueryItem } from "@/lib/types";

import { InteractiveItem } from "@/components/InteractiveItem";
import { QueryRemove } from "@/components/query/QueryRemove";
import { QueryEditSheet } from "@/components/query/QueryEditSheet";

interface Props {
  queryItem: QueryItem;
}

export function QueryCard({ queryItem }: Props) {
  const query = useQuery({ queryKey: queryItem.queryKey });

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
    <InteractiveItem
      className={cn(
        "transition-colors duration-200",
        highlight && "bg-primary/10"
      )}
      queryItem={queryItem}
      Sheet={QueryEditSheet}
      remove={<QueryRemove id={queryItem.id} />}
    />
  );
}

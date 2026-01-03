import { DataCard } from "./DataCard";
import { queries } from "@/lib/queryKey";
import { useQuery } from "@tanstack/react-query";

function HouseCountComponent(count: number) {
  return <p>{count}</p>;
}

export function HouseCount({ className }: { className?: string }) {
  const queryMeta = queries.house.list()._ctx.count;
  const q = useQuery(queryMeta);

  return (
    <DataCard
      className={className}
      query={q}
      keys={queryMeta.queryKey}
      label={"HouseCount"}
      comp={HouseCountComponent}
    />
  );
}

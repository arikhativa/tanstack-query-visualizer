import { DataCard } from "./DataCard";
import { queries } from "@/lib/queryKey";
import { useQuery } from "@tanstack/react-query";
import { HousePageComponent } from "./HousePageComponent";

export function HousePage({ className }: { className?: string }) {
  const queryMeta = queries.house.list({ page: 0, limit: 4 });
  const q = useQuery(queryMeta);

  return (
    <DataCard
      className={className}
      query={q}
      keys={queryMeta.queryKey}
      label={"HousePage"}
      comp={HousePageComponent}
    />
  );
}

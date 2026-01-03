import { DataCard } from "./DataCard";
import { queries } from "@/lib/queryKey";
import { useQuery } from "@tanstack/react-query";
import { HousePageComponent } from "./HousePageComponent";

export function HousePageFilter({ className }: { className?: string }) {
  const queryMeta = queries.house.list({
    filters: { byResidentIdList: ["R1"] },
    page: 0,
    limit: 4,
  });
  const q = useQuery(queryMeta);

  return (
    <DataCard
      className={className}
      query={q}
      keys={queryMeta.queryKey}
      label={"Houses owned by R1 "}
      comp={HousePageComponent}
    />
  );
}

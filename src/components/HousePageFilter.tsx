import { DataCard } from "./DataCard";
import { queries } from "@/lib/queryKey";
import { useQuery } from "@tanstack/react-query";
import { HousePageComponent } from "./HousePageComponent";

export function HousePageFilter({
  className,
  page,
  limit,
  byResidentIdList,
}: {
  page: number;
  limit: number;
  byResidentIdList: string[];
  className?: string;
}) {
  const queryMeta = queries.house.list({
    filters: { byResidentIdList },
    page,
    limit,
  });
  const q = useQuery(queryMeta);

  return (
    <DataCard
      className={className}
      query={q}
      keys={queryMeta.queryKey}
      label={"Houses owned by " + byResidentIdList.join(", ")}
      comp={HousePageComponent}
    />
  );
}

import { DataCard } from "./DataCard";
import { queries } from "@/lib/queryKey";
import { useQuery } from "@tanstack/react-query";
import { HouseContent } from "./HouseContent";

export function HouseDetail({
  className,
  id,
}: {
  id: string;
  className?: string;
}) {
  const queryMeta = queries.house.detail(id);
  const q = useQuery(queryMeta);

  return (
    <DataCard
      className={className}
      query={q}
      keys={queryMeta.queryKey}
      label={"HouseDetail"}
      comp={HouseContent}
    />
  );
}

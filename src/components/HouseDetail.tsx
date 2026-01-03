import { DataCard } from "./DataCard";
import { queries } from "@/lib/queryKey";
import { useQuery } from "@tanstack/react-query";
import { HouseContent } from "./HouseContent";

export function HouseDetail({ id }: { id: string }) {
  const queryMeta = queries.house.detail(id);
  const q = useQuery(queryMeta);

  return (
    <DataCard
      query={q}
      keys={queryMeta.queryKey}
      label={"HouseDetail"}
      comp={HouseContent}
    />
  );
}

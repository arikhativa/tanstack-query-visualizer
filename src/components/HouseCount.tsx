import { DataCard } from "./DataCard";
import { queries } from "@/lib/queryKey";
import { useQuery } from "@tanstack/react-query";
import type { House } from "@/lib/types";

function HouseCountComponent(list: House[]) {
  return <p>{list.length}</p>;
}

export function HouseCount() {
  const queryMeta = queries.house.list();
  const q = useQuery(queryMeta);

  return (
    <DataCard
      query={q}
      keys={queryMeta.queryKey}
      label={"HouseCount"}
      comp={HouseCountComponent}
    />
  );
}

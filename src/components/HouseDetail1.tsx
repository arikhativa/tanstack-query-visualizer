import type { House } from "@/lib/types";
import { DataCard } from "./DataCard";
import { queries } from "@/lib/queryKey";
import { useQuery } from "@tanstack/react-query";

function A({ id, address, residentIdList }: House) {
  return (
    <>
      <p>id: {id}</p>
      <p>address: {address}</p>
      <p>residentIdList: {residentIdList.join(", ")}</p>
    </>
  );
}

export function HouseDetail1() {
  const q = useQuery(queries.house.detail("H1"));

  return (
    <DataCard
      query={q}
      keys={queries.house.detail._def}
      label={"Books Count"}
      comp={A}
    ></DataCard>
  );
}

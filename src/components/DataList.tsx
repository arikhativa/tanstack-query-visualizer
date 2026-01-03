import { useMemo } from "react";
import { DataCard } from "./DataCard";

export function DataList() {
  const keys = useMemo(() => ["books", "count"], []);
  return (
    <div className="flex gap-4 h-fit">
      <DataCard keys={keys} label={"Books Count"}>
        <p>5</p>
      </DataCard>
      <DataCard keys={keys} label={"Books Count"}>
        <p>5</p>
      </DataCard>
    </div>
  );
}

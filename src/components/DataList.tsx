import { HouseDetail } from "./HouseDetail";

export function DataList() {
  return (
    <div className="flex gap-4 h-fit">
      <HouseDetail id={"H1"} />
      <HouseDetail id={"H2"} />
    </div>
  );
}

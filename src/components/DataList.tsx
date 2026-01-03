import { HouseCount } from "./HouseCount";
import { HouseDetail } from "./HouseDetail";

export function DataList() {
  return (
    <div className="grid grid-cols-4 gap-4 h-fit">
      <HouseDetail id={"H1"} />
      <HouseDetail id={"H2"} />
      <HouseCount />
    </div>
  );
}

import { HouseCount } from "./HouseCount";
import { HouseDetail } from "./HouseDetail";

export function DataList() {
  return (
    <div className="flex-1 flex gap-4 h-fit">
      <HouseDetail className="flex-1" id={"H1"} />
      <HouseDetail className="flex-1" id={"H2"} />
      <HouseCount className="flex-1" />
    </div>
  );
}

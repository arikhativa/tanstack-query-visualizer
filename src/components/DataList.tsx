import { HouseCount } from "./HouseCount";
import { HouseDetail } from "./HouseDetail";
import { HousePage } from "./HousePage";
import { HousePageFilter } from "./HousePageFilter";

export function DataList() {
  return (
    <div className="space-y-4 w-full">
      <div className="flex-1 flex gap-4 h-fit">
        <HouseDetail className="flex-1" id={"H1"} />
        <HouseDetail className="flex-1" id={"H2"} />
        <HouseCount className="flex-1" />
        <HousePage className="flex-1" />
      </div>
      <div className="flex-1 flex gap-4 h-fit">
        <HousePageFilter
          byResidentIdList={["R1"]}
          page={0}
          limit={4}
          className="flex-1"
        />
        <HousePageFilter
          byResidentIdList={["R1"]}
          page={1}
          limit={4}
          className="flex-1"
        />
        <HousePageFilter
          byResidentIdList={["R2"]}
          page={1}
          limit={4}
          className="flex-1"
        />
      </div>
    </div>
  );
}

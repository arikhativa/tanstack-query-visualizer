import { useState } from "react";
import { Button } from "@base-ui/react";
import { HouseDetail1 } from "./HouseDetail1";

export function DataList() {
  const [_kkk, setKKK] = useState(0);
  return (
    <div className="flex gap-4 h-fit">
      <Button onClick={() => setKKK((prev) => prev + 1)}>render</Button>
      <HouseDetail1 />
    </div>
  );
}

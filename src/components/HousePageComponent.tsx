import type { House } from "@/lib/types";

export function HousePageComponent(list: House[]) {
  return (
    <>
      {list.map((e) => (
        <div key={e.id} className="">
          <p>id: {e.id}</p>
        </div>
      ))}
    </>
  );
}

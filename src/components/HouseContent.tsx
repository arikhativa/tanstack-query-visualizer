import type { House } from "@/lib/types";

export function HouseContent({ id, address, residentIdList }: House) {
  return (
    <>
      <p>id: {id}</p>
      <p>address: {address}</p>
      <p>residentIdList: {residentIdList.join(", ")}</p>
    </>
  );
}

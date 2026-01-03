import { createQueryKeys } from "@lukemorales/query-key-factory";
import type { House } from "../types";

const houseData: House[] = [
  {
    id: "H1",
    address: "main street",
    residentIdList: [],
  },
];

export const house = createQueryKeys("house", {
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => {
      const ret = houseData.find((e) => e.id === id);
      if (ret) return ret;
      throw new Error("404");
    },
  }),
});

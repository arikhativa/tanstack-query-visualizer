import { createQueryKeys } from "@lukemorales/query-key-factory";
import type { House } from "../types";

export const houseData: House[] = Array.from({ length: 50 }, (_, i) => ({
  id: `H${i + 1}`,
  address: `${i + 1} Main Street`,
  residentIdList: [],
}));

interface getDataParams {
  filters?: string;
  page?: number;
  limit?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getData({ filters, page, limit }: getDataParams): House[] {
  const filtered = houseData;

  if (limit && page) {
    const start = page * limit;
    return filtered.slice(start, start + limit);
  }
  return filtered;
}

export const house = createQueryKeys("house", {
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => {
      const ret = houseData.find((e) => e.id === id);
      if (ret) return ret;
      throw new Error("404");
    },
  }),
  list: (filters?: string, page?: number, limit?: number) => ({
    queryKey: [{ filters }, page, limit],
    queryFn: () => getData({ filters, page, limit }),
    contextQueries: {
      count: {
        queryKey: null,
        queryFn: () => getData({ filters, page, limit }).length,
      },
    },
  }),
});

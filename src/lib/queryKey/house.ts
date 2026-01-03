import { createQueryKeys } from "@lukemorales/query-key-factory";
import type { House } from "../types";

const houseData: House[] = Array.from({ length: 50 }, (_, i) => {
  const residentIds = ["R1", "R2", "R3"];
  const residentIdList: string[] = [];

  if (i % 4 === 0) {
    residentIdList.push(
      residentIds[Math.floor(Math.random() * residentIds.length)]
    );
    if (Math.random() > 0.5) {
      residentIdList.push(
        residentIds[Math.floor(Math.random() * residentIds.length)]
      );
    }
    if (Math.random() > 0.7) {
      residentIdList.push(
        residentIds[Math.floor(Math.random() * residentIds.length)]
      );
    }
  }

  return {
    id: `H${i + 1}`,
    address: `${i + 1} Main Street`,
    residentIdList,
  };
});
interface Filters {
  byResidentIdList?: string[];
}

interface ListParams {
  filters?: Filters;
  page?: number;
  limit?: number;
}

function getData({ filters, page, limit }: ListParams): House[] {
  let filtered = houseData;

  if (filters?.byResidentIdList && filters.byResidentIdList.length > 0) {
    filtered = filtered.filter((house) =>
      filters.byResidentIdList!.some((id) => house.residentIdList.includes(id))
    );
  }
  if (limit !== undefined && page !== undefined) {
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
  list: (params: ListParams = {}) => ({
    queryKey: getListKeys(params),
    queryFn: () => getData(params),
    contextQueries: {
      count: {
        queryKey: null,
        queryFn: () => getData(params).length,
      },
    },
  }),
});

function getListKeys({ filters, page, limit }: ListParams) {
  if (page !== undefined && limit !== undefined) {
    return [filters, { page, limit }] as const;
  }
  return [filters] as const;
}

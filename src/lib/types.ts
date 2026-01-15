import { z } from "zod";

export type TQueryKeys = (string | number | object | null | undefined)[];

export interface House {
  id: string;
  address: string;
  residentIdList: string[];
}

export interface QueryItem {
  id: string;
  queryKey: TQueryKeys;
  label: string;
}

// export type QueryItem = z.infer<typeof queryItemSchema>;

import { z } from "zod";
import type { queryItemSchema } from "@/lib/schemas";

export type TQueryKeys = readonly (
  | string
  | number
  | object
  | null
  | undefined
)[];

export interface House {
  id: string;
  address: string;
  residentIdList: string[];
}

// export interface QueryItem {
//   queryKey: TQueryKeys;
//   label: string;
// }

export type QueryItem = z.infer<typeof queryItemSchema>;

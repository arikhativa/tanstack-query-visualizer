import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { house } from "./house";
import { resident } from "./resident";

export const queries = mergeQueryKeys(house, resident);

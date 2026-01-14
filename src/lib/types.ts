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

export interface QueryItem {
  queryKey: TQueryKeys;
  label: string;
}

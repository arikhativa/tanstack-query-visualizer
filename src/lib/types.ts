export type TQueryKeys = readonly (string | number | object | undefined)[];

export interface House {
  id: string;
  address: string;
  residentIdList: string[];
}

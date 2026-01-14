import { useStorage } from "@/components/providers/StorageProvider";

export function useQueryListData() {
  const { storage } = useStorage();
  return storage.queryList;
}

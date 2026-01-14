import { useStorage } from "@/components/providers/StorageProvider";

export function useMutationListData() {
  const { storage } = useStorage();
  return storage.mutationList;
}

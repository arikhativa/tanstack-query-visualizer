import { useStorage } from "@/components/providers/StorageProvider";
import type { QueryItem } from "@/lib/types";

export function useMutationListData() {
  const { storage, setStorage } = useStorage();

  const pushItem = (item: QueryItem) => {
    setStorage((prev) => ({
      ...prev,
      mutationList: [...prev.mutationList, item],
    }));
  };

  return { list: storage.mutationList, pushItem };
}

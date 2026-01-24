import { useMutationListData } from "@/hooks/useMutationListData";
import { MutationCard } from "./MutationCard";
import { MutationCreateSheet } from "@/components/mutation/MutationCreateSheet";
import { ItemList } from "@/components/ItemList";

export function MutationList() {
  const { list } = useMutationListData();

  return (
    <ItemList>
      {list.map((e) => (
        <MutationCard key={e.id} queryItem={e} />
      ))}
      {list.length < 10 && <MutationCreateSheet />}
    </ItemList>
  );
}

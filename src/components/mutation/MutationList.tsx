import { useMutationListData } from "@/hooks/useMutationListData";
import { MutationCard } from "./MutationCard";
import { MutationCreateSheet } from "@/components/mutation/MutationCreateSheet";

export function MutationList() {
  const { list } = useMutationListData();
  return (
    <>
      <p>MutationList</p>
      {list.map((e) => (
        <MutationCard key={e.id} queryItem={e} />
      ))}
      <MutationCreateSheet />
    </>
  );
}

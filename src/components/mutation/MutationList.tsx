import { useMutationListData } from "@/hooks/useMutationListData";
import { MutationCard } from "./MutationCard";
import { MutationSheet } from "./MutationSheet";
import { MutationCreateSheet } from "@/components/mutation/MutationCreateSheet";

export function MutationList() {
  const { list } = useMutationListData();
  return (
    <>
      <p>MutationList</p>
      {list.map((e) => (
        <MutationCard
          key={e.label}
          // this should use a formArray id
          queryItem={e}
        />
      ))}
      <MutationCreateSheet />
    </>
  );
}

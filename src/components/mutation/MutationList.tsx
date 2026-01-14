import { useMutationListData } from "@/hooks/useMutationListData";
import { MutationCard } from "./MutationCard";
import { MutationSheet } from "./MutationSheet";

export function MutationList() {
  const mutationList = useMutationListData();
  return (
    <>
      <p>MutationList</p>
      {mutationList.map((e) => (
        <MutationCard
          key={e.label}
          // this should use a formArray id
          queryItem={e}
        />
      ))}
      <MutationSheet />
    </>
  );
}

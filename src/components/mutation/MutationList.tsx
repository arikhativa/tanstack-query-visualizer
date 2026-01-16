import { useMutationListData } from "@/hooks/useMutationListData";
import { MutationCard } from "./MutationCard";
import { MutationCreateSheet } from "@/components/mutation/MutationCreateSheet";

export function MutationList() {
  const { list } = useMutationListData();
  return (
    <>
      <div className="flex flex-col gap-4">
        {list.map((e) => (
          <MutationCard key={e.id} queryItem={e} />
        ))}
      </div>
      <MutationCreateSheet />
    </>
  );
}

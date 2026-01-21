import { useMutationListData } from "@/hooks/useMutationListData";
import type { QueryItem } from "@/lib/types";
import { MutationForm } from "@/components/mutation/MutationForm";
import { FormSheet } from "@/components/FormSheet";

interface Props {
  current: QueryItem;
  children: React.ReactNode;
}

export function MutationEditSheet({ children, current }: Props) {
  const { replaceItem } = useMutationListData();

  return (
    <FormSheet
      current={current}
      children={children}
      toastString={"Mutation Saved"}
      FormComponent={MutationForm}
      onSave={replaceItem}
      title="Edit Mutation"
    />
  );
}

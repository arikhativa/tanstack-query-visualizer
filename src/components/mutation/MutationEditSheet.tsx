import { useMutationListData } from "@/hooks/useMutationListData";
import type { QueryItem } from "@/lib/types";
import { FormSheet } from "@/components/FormSheet";
import { QueryItemForm } from "@/components/QueryItemForm";

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
      FormComponent={QueryItemForm}
      onSave={replaceItem}
      title="Edit Mutation"
    />
  );
}

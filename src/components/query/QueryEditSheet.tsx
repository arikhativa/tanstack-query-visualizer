import { useMutationListData } from "@/hooks/useMutationListData";
import type { QueryItem } from "@/lib/types";
import { FormSheet } from "@/components/FormSheet";
import { QueryItemForm } from "@/components/QueryItemForm";

interface Props {
  current: QueryItem;
  children: React.ReactNode;
}

export function QueryEditSheet({ children, current }: Props) {
  const { replaceItem } = useMutationListData();

  return (
    <FormSheet
      side={"left"}
      current={current}
      children={children}
      toastString={"Query Saved"}
      FormComponent={QueryItemForm}
      onSave={replaceItem}
      title="Edit Query"
    />
  );
}

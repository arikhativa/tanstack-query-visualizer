import { useMutationListData } from "@/hooks/useMutationListData";
import type { QueryItem } from "@/lib/types";
import { FormSheet } from "@/components/FormSheet";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QueryItemForm } from "@/components/QueryItemForm";

const defaultValues: QueryItem = {
  id: crypto.randomUUID(),
  label: "",
  queryKey: [],
} as const;

export function MutationCreateSheet() {
  const { pushItem } = useMutationListData();

  return (
    <FormSheet
      side="right"
      current={defaultValues}
      toastString={"New Mutation Created"}
      FormComponent={QueryItemForm}
      onSave={pushItem}
      title="Create Mutation"
    >
      <Button variant={"ghost"} size={"icon-lg"}>
        <Plus className="size-6" />
      </Button>
    </FormSheet>
  );
}

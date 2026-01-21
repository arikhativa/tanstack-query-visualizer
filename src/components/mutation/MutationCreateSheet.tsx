import { useMutationListData } from "@/hooks/useMutationListData";
import type { QueryItem } from "@/lib/types";
import { MutationForm } from "@/components/mutation/MutationForm";
import { FormSheet } from "@/components/FormSheet";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const defaultValues: QueryItem = {
  id: crypto.randomUUID(),
  label: "",
  queryKey: [],
} as const;

export function MutationCreateSheet() {
  const { pushItem } = useMutationListData();

  return (
    <FormSheet
      current={defaultValues}
      toastString={"New Mutation Created"}
      FormComponent={MutationForm}
      onSave={pushItem}
      title="Create Mutation"
    >
      <Button variant={"ghost"} size={"icon-lg"}>
        <Plus className="size-6" />
      </Button>
    </FormSheet>
  );
}

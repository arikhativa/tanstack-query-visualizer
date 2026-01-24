import { useQueryListData } from "@/hooks/useQueryListData";
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

export function QueryCreateSheet() {
  const { pushItem } = useQueryListData();

  return (
    <FormSheet
      side="left"
      current={defaultValues}
      toastString={"New Query Created"}
      FormComponent={QueryItemForm}
      onSave={pushItem}
      title="Create Query"
    >
      <Button variant={"ghost"} size={"icon-lg"}>
        <Plus className="size-6" />
      </Button>
    </FormSheet>
  );
}
